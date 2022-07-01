const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
const { isCurrentUser } = require('../../utils/auth');

const { Review, Spot, User } = require('../../db/models');
const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
    const currentUser = isCurrentUser(_req);
    const reviews = await Review.findAll({
      // where: { userId: currentUser.id },
      include: User,
      where: {
        userId: currentUser.id
      }
    })
    return res.json(reviews);
  }));

//get comments router
router.get('/:spotId', asyncHandler(async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    console.log(spot);
    const id = req.params.spotId
    const reviews = await Review.findAll();
    return res.json(reviews);
  }));
  
  // new comment
  router.post('/:spotId/reviews', /*have to validate*/ asyncHandler(async function (req, res) {

    const spotId = req.params.spotId
    const {
      userId,
      comment: reviewComment,
     } = req.body;
    const review = await Review.create({
      userId,
      spotId,
      comment: reviewComment,
    });
  return res.json(review);
  }));
  
  //delete comment
  router.delete('/:spotId/reviews/:id', /*have to validate*/ asyncHandler(async function (req, res) {
    const {id} = req.params;
    console.log(req.params)
    console.log("dfkgjldkfjsl;kdfjlsdkfjlsdkfjsdf", id)
    const review = await Review.findByPk(id);
    await review.destroy();
    return res.json({id});
    })
  );
  
  router.put('/:spotId/reviews/:id', /*have to validate*/ asyncHandler(async function (req, res) {
    const id = parseInt(req.params.id);
    await Review.update(req.body, {
      where: { id }
    });
    const review = await Review.findByPk(id);
    return res.json(review);
  }));
  module.exports = router;
