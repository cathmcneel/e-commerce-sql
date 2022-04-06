const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      // JOIN with products     
      include: [ {model: Product} ]
    })
    res.status(200).json(tagData);

  } catch (err) {
    //console log error if status = 500
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

// router.get('/:id', (req, res) => {
//   Tag.findOne({
//       where: {
//         id: req.params.id
//       },
//       include: [ {model: Product} ]
//   })
//   .then(tagData => {
//     if (!tagData) {
//       res.status(404).json({ message: 'No tag found with this id'});
//       return;
//     }
//     res.json(tagData);
//   })
//   .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//   });
//   // find a single tag by its `id`
//   // be sure to include its associated Product data
// });

// router.post('/', (req, res) => {
//   // create a new tag
//   Tag.create({
//     Id: req.body.id,
//     Tag_name: req.body.tag_name
//   })
//     .then(tagData => {
//       require.session.save(() => {
//       req.session.id = tagData.id;
//       req.session.tag_name = tagData.tag_name;

//       res.json(tagData);
//     });
//   }) .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//     });
// });

// router.put('/:id', (req, res) => {
//   // update a tag's name by its `id` value
//   Tag.update(req.body, {
//       individualHooks: true,
//       where: {
//           id: req.params.id
//       }
//   })
//     .then(tagData => {
//       if (tagData[0]) {
//         res.status(404).json({ message: 'No tag found with this id '});
//         return;
//       }
//       res.json(tagData);
//     })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
// });

// router.delete('/:id', (req, res) => {
//   // delete on tag by its `id` value
//   Tag.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(tagData => {
//       if (tagData) {
//         res.status(404).json({ message: 'No user found with this tag' });
//         return;
//       }
//         res.json(tagData);
//     })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
// });

module.exports = router;
