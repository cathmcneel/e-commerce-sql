const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
    try {
      const categoriesData = await Category.findAll({
        // JOIN with products     
        include: [ {model: Product} ]
      })
      res.status(200).json(categoriesData);
  
    } catch (err) {
      //console log error if status = 500
      res.status(500).json(err);
    }
  });


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [ {model: Product} ]
  
  })
  .then(dbE_commerce => {
    if (!dbE_commerce) {
      res.status(404).json({ message: 'No product found with this id'});
      return;
    }
    res.json(dbE_commerce);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });

});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then(dbE_commerce => {
      req.session.save(() => {
        req.session.category_name = dbE_commerce.category_name;

        res.json(dbE_commerce);
      });
    })
      .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  then(dbE_commerce => {
    if (!dbE_commerce) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbE_commerce)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
