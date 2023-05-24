const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
   console.log(req.body);
   const model = {
      name: req.body.name,
   };

   res.status(200).json({
      message: 'model get',
      model: model,
   });
});

module.exports = router;