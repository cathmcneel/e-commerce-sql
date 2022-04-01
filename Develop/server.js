const express = require('express');
const routes = require('./routes');
const dotenv = require('dotenv')
const mysql = require('mysql2');
const sequelize = require('./config/connection');
const path = require('path');



const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config()
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);

// sync sequelize models to the database, then turn on the server
// sequelize.sync creates new tables according to the schema specified in the model.
// this schema is found in models/index.js
// new tables are created according to the schema defined in each model file
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App now running on port ${PORT}`));
});
