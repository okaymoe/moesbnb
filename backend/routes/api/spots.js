const express = require('express')
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { validateSpot, validateSpotDelete } = require('../../utils/validation');
const { Spot, Image, Review, Booking } = require('../../db/models');

const router = express.Router();

// Create
router.post(
    '/',
    requireAuth,
    validateSpot,
    asyncHandler(async (req, res) => {
        const { userId, address, city, state, country, name, price, images } = req.body;

        const spot = await Spot.create({
            userId,
            address,
            city,
            state,
            country,
            name,
            price
        });
        const spotId = spot.id;
        const imgArr = [];

        for (let url of images) {
            if (url) imgArr.push(await Image.create({spotId, url}));
        }

        return res.json({
          spot,
          imgArr
        });
    })
);

// Load All
router.get('/all', asyncHandler(async (req, res) => {
    const data = await Spot.findAll({
        include: [
            {
                model: Image,
                attributes: ['url']
            },
            {
                model: Review,
                attributes: ['rating']
            }
        ]
    });
    console.log(JSON.stringify(data))
    return res.json(data);
}));

// Load individual
router.get('/:spotId(\\d+)', asyncHandler(async (req, res) => {
    const spotId = parseInt(req.params.spotId, 10);
    const spot = await Spot.findByPk(spotId);

    const images = await Image.findAll({
        where: {
            spotId
        }
    });
    const reviews = await Review.findAll({
        where: {
            spotId
        }
    });
    const bookings = await Booking.findAll({
        where: {
            spotId,
        }
    });
    return res.json({spot, images, reviews, bookings});
}));

// Update individual
router.patch('/:spotId(\\d+)',
    requireAuth,
    validateSpot,
    asyncHandler(async (req, res) => {
        const spotId = parseInt(req.params.spotId, 10);
        const spot = await Spot.findByPk(spotId);

        const imgArr = [];

        // check if images are removed, delete from DB if so
        const filteredOld = (req.body.oldImages).filter(url => {
            return !(req.body.images).includes(url);
        });
        if (filteredOld.length) {
            for (let url of filteredOld) {
                if (url) {
                    const imgToRemove = await Image.findOne({ where: { spotId, url } });
                    await imgToRemove.destroy();
                }
            }
        }
        // check for new image, add to DB if so
        for (let url of req.body.images) {
            if (url) {
                const img = await Image.findAll({ where: { url } });
                if (!img.length) {
                    const newImg = await Image.create({spotId, url});
                    imgArr.push(newImg);
                } else {
                    imgArr.push(await Image.findOne({ where: { url } }));
                }
            }
        }

        spot.address = req.body.address;
        spot.city = req.body.city;
        spot.state = req.body.state;
        spot.country = req.body.country;
        spot.name = req.body.name;
        spot.price = req.body.price;

        await spot.save();

        return res.json({spot, imgArr});
}));

// Delete individual
router.delete('/:spotId(\\d+)',
    requireAuth,
    validateSpotDelete,
    asyncHandler(async (req, res) => {
        const spotId = req.body.spot.id;

        // destroy spot from DB
        const spot = await Spot.findByPk(spotId);
        await spot.destroy();

        return res.json({});
}));

module.exports = router;
