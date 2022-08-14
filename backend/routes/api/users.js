const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { validateSignup } = require('../../utils/validation');
const { User, Review, Booking, Spot } = require('../../db/models');

const router = express.Router();

// Signup
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user
      });
    })
);

// Load individual user
router.get('/:userId(\\d+)', asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  const user = await User.findByPk(userId, {
    include: [
      {
        model: Review,
        attributes: ['spotId','description','rating'],
        include: {
          model: Spot,
          attributes: ['name']
        }
      },
      {
        model: Booking,
        attributes: ['spotId','startDate','endDate','cost'],
        include: {
          model: Spot,
          attributes: ['name', 'price']
        }
      },
    ]
  });
  return res.json(user);
}));

module.exports = router;
