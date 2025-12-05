const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db'); // your MySQL connection



const login=require('./routes/login');
const signup=require('./routes/signup')
const profile=require('./routes/profile');
const auth = require('./middleware/auth');
const addstore=require('./routes/addstore');
const nearbygarage= require('./routes/nearbygarage');
const booking =require('./routes/booking');
const garage=require('./routes/garage');
// Middleware to parse JSON
app.use(express.json());
const cors = require("cors");
app.use(cors());

// Middleware to handle invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      error: 'Invalid JSON format',
      message: err.message
    });
  }
  next();
});

app.use((req,res,next)=>{
   console.log("Incoming request URL:", req.originalUrl);
  next();
})



//routes;
app.use('/login',login);
app.use('/signup',signup);
app.use('/profile',auth,profile);
app.use('/addstore',addstore);
app.use('/nearbygarage',nearbygarage);
app.use('/booking',booking);
app.use('/garage',garage);

app.listen(9000, () => {
  console.log('Server running on port 9000');
});























































