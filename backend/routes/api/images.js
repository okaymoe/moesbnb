const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { isCurrentUser } = require('../../utils/auth');

const { Spot, Image } = require('../../db/models');

const router = express.Router();

router.post('/:id', asyncHandler(async function (req, res, next) {
  const currentUser = isCurrentUser(req);

  const images = [];
  const {imageURLs} = req.body;
  for (let i=0; i<imageURLs.length; i++){
    const image = imageURLs[i];
    const newImage = await Image.create(image);
    images.push(newImage);
  }
  console.log("dslkfhldskfhjlsdkfjs;ldkfjl;sdkfjlsdkfjlsdkfjlsdkfjsldkfjlsdkjflksdjfldskjfsldkf", images)
  return res.json(images);
}));

// router.get('/api/images/:spotId', asyncHandler(async (req, res) => {
//   const image = await Image.findAll({
//     where
//   })

//   return res.json(reviews);
// }));


router.get('/:spotId', asyncHandler(async (req, res) => {
  const image = await Image.findAll({
    where: { 
      spotId: req.params.spotId
    }
  });
  console.log(image, "222222222222222222222222222222222222")
  return res.json(image)
}))

module.exports = router;