const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { isCurrentUser } = require('../../utils/auth');

// const { getUserToken } = require("../auth");

const { User, Spot, Image, Review } = require('../../db/models');
const router = express.Router();

const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an address')
    .isLength({ max: 50 })
    .withMessage('Please keep address within 50 characters'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a city')
    .isLength({ max: 50 })
    .withMessage('Please keep city within 50 characters'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a state')
    .isLength({ max: 50 })
    .withMessage('Please keep state within 50 characters'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a country')
    .isLength({ max: 50 })
    .withMessage('Please keep country within 50 characters'),
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a descriptive name')
    .isLength({ max: 150 })
    .withMessage('Please keep address within 150 characters'),
  check('price')
    .exists({ checkFalsey: true })
    .withMessage('Please provide a nightly rate'),
  handleValidationErrors
];

router.get('/', asyncHandler(async (_req, res) => {
  const spots = await Spot.findAll({
    include: [{
      model: Review,
    },{
      model: Image,
    }]
  })
  return res.json(spots);
}));

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const spot = await Spot.findByPk(id, {
    include: {
      model: Image,
      where: {
        spotId: id
      }
    }
  });
  router.get('/:id/reviews', asyncHandler(async function(req, res) {
    const id = req.params.id

    const reviews = await Review.findAll({
      where: {
        spotId: id
      },
      include: User
    });
    console.log(reviews)

    return res.json(reviews);
  }));
  return res.json(spot);
}));



router.post('/', validateSpot, asyncHandler(async function (req, res, next) {
  const currentUser = isCurrentUser(req);

  const {
    address,
    city,
    state,
    country,
    name,
    price,
  } = req.body;

  const spot = await Spot.create({
    userId: currentUser.id,
    address,
    city,
    state,
    country,
    name,
    price,
  });
  return res.json(spot);
}));

router.put('/:id(\\d+)', validateSpot, asyncHandler(async function (req, res, next) {
  const id = parseInt(req.params.id);
  await Spot.update(req.body, {
    where: { id }
  });
  const spot = await Spot.findByPk(id);
  return res.json(spot);
}))

router.delete('/:id(\\d+)', asyncHandler(async function (req, res) {
  const id = parseInt(req.params.id);
  const spot = await Spot.findByPk(id);
  if (spot) {
    await spot.destroy();
    return res.json(spot.id)
  } else {
    throw new Error('Spot could not be found')
  }
}));

router.post('/:id(\\d+)/images', asyncHandler(async function (req, res, next) {
  if (req.body.newImages) {
    req.body.newImages.forEach(async item => {
      await Image.create(item);
    })
    return res.json(req.body.newImages);
  } else {
    req.body.imageURLs.forEach(async item => {
      await Image.create(item);
    })
    return res.json(req.body.imageURLs);
  }
}));

router.put('/:id(\\d+)/images', asyncHandler(async function (req, res, next) {
  req.body.updatedPhotos.forEach(async item => {
    await Image.update(item, {
      where: { id: item.id }
    })
  })
  return res.json(req.body.updatedPhotos);
}));
module.exports = router;