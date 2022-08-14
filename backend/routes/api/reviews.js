const express = require('express')
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { validateReview } = require('../../utils/validation');
const { Review } = require('../../db/models');

const router = express.Router();

// Create
router.post(
    '/',
    requireAuth,
    validateReview,
    asyncHandler(async (req, res) => {
        const { userId, spotId, description, rating } = req.body;

        const review = await Review.create({
            userId,
            spotId,
            description,
            rating
        });

        return res.json(review);
    })
);

// Edit
router.patch(
    '/:reviewId(\\d+)',
    requireAuth,
    validateReview,
    asyncHandler(async (req, res) => {
        const reviewId = req.body.reviewId;

        const review = await Review.findByPk(reviewId);

        review.description = req.body.description;
        review.rating = req.body.rating;

        await review.save();

        return res.json(review);
    })
);

// Delete
router.delete(
    '/:reviewId(\\d+)',
    requireAuth,
    asyncHandler(async (req, res) => {
        const reviewId = req.body.review.id;

        const review = await Review.findByPk(reviewId);
        await review.destroy();

        return res.json({});
}));

module.exports = router;
