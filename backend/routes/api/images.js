const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { isCurrentUser } = require('../../utils/auth');

const { Spot, Image } = require('../../db/models');

router.post('/', validateSpot, asyncHandler(async function (req, res, next) {
  const currentUser = isCurrentUser(req);

  const {url} = req.body;

  const spot = await Spot.create({
    userId: currentUser.id,
    url
  });
  return res.json(spot);
}));

module.exports = router;