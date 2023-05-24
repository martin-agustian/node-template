const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

app.use(morgan('dev'));
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(upload.array());
// app.use(express.static('public'));

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', '*');
   res.header('Access-Control-Allow-Methods', '*');

   next();
});

const modelRoutes = require('./api/routes/models');

app.use('/models', modelRoutes);

app.use((req, res, next) => {
   // res.status(200).json({
   //    message: 'it works!',
   // });

   const error = new Error('Not Found');
   error.status = 404;
   next(error);
});

app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
      error: {
         message: error.message,
      },
   });
});

module.exports = app;