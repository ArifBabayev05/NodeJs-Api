const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const morgan = require("morgan")
require('dotenv').config();


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect(`mongodb+srv://ArifBabayev:${process.env.PASSWORD}@cluster0.sjpf18q.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
   console.log("successfully connected")
})
// mongoose.connect("mongodb+srv://ArifBabayev:Youtube2005@cluster0.sjpf18q.mongodb.net/?retryWrites=true&w=majority").then(()=>{
//    console.log("successfully connected")
// })


//process.env.MongoDB_Connection
//Logging Middleware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*',)
   // * --> Allow any request. Doesnt matter which adress 
   res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
   if (req.method === "OPTIONS") {
      res.header("Access-Contol-Allow-Methods", "PUT,POST,DELETE,PATCH ,GET")
      return res.status(200).json();
   }
   next();
})

//Routes
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

app.use((req, res, next) => {
   const error = new Error("Not found");
   error.status = 404;
   next(error)
})

app.use((error, req, res, next) => {
   res.status(error.status || 500)
   res.json({
      error: {
         message: error.message
      }
   });
})

module.exports = app;