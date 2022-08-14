const express = require('express')
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Booking, Spot } = require('../../db/models');

const router = express.Router();

// Create
router.post(
    '/',
    requireAuth,
    asyncHandler(async (req, res) => {
        const { spotId, userId, startDate, endDate, cost } = req.body;

        const booking = await Booking.create({
            spotId,
            userId,
            startDate,
            endDate,
            cost
        });

        return res.json(booking);
    })
);

// Edit
router.patch(
    '/',
    requireAuth,
    asyncHandler(async (req, res) => {
        const { spotId, userId, startDate, endDate, cost } = req.body;

        const booking = await Booking.findOne({
            where: {
                spotId,
                userId
            },
            include: {
                model: Spot,
                attributes: ['name', 'price']
            }
        });

        booking.startDate = startDate;
        booking.endDate = endDate;
        booking.cost = cost;

        await booking.save();

        return res.json(booking);
    })
);

// DELETE
router.delete(
    '/',
    requireAuth,
    asyncHandler(async (req, res) => {
        const { spotId, userId } = req.body;

        const booking = await Booking.findOne({
            where: {
                spotId,
                userId
            }
        });

        await booking.destroy();

        return res.json({spotId});
    })
);

module.exports = router;
