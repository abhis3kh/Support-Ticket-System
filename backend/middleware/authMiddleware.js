const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const userModel = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  // initialize token variable
  let token;
  //   checking if we have anything in header of the request authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //   get the token from header
      token = req.headers.authorization.split(' ')[1]; //split bearer & get the token only
      //very the token
      const decoded = jwt.verify(token, process.env.JWT_SCRECT);
      //   get user from database using the token in the request header without the password field
      req.user = await userModel.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('You are not authrozied');
    }
  }
  if (!token) {
    //no token is there in the request header
    res.status(401);
    throw new Error('You are not authrozied');
  }
});
module.exports = {
  protect,
};
