const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: [
      'category_name',
      'id'
    ],
    include: [
      {
        model: Product,
        attributes: ['category_id', 'id', 'price', 'product_name', 'stock'],
      }
    ]
})

  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(404).json(err);
   });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id 
    },
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product, 
        attributes: ['category_id', 'id', 'price', 'product_name', 'stock'],
      }
    ]
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
    id: req.body.id
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
    {
      where: {
        id: req.params.idk
      }
    }
  )
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'Error'});
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    });
});    

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.findAll
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'Error'});
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    });
});

module.exports = router;
