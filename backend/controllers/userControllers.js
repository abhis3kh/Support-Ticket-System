const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs'); //for hashing the password
const jwt = require('jsonwebtoken');
// model for user
const userModel = require('../models/userModel');
// @desc : Register a new user
// @route : /api/users
// @access : Public (no token needed)
const registerUser = asyncHandler(async (req, res) => {
  //getting the input data from the req
  const { name, password, email } = req.body;

  //validation where client doesn't provide the correct data
  if (!name || !password || !email) {
    res.status(400);

    //   throwing an error upon facing invalid data issue as it will throw error
    throw new Error('Please Include all the required fields');
  } else {
    // find if user already exits with same email id, throw error
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists in the database.');
    }
    // if the user is newOne
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create user in the database
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    // if the user create
    if (user) {
      // send a response to frontend so they can use it after authentication
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id), //will generate a token and send as response as well.
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data.');
    }
  }
});
// @desc : Login a user
// @route : /api/users/login
// @access : Public (no token needed)
const loginUser = asyncHandler(async (req, res) => {
  // input data
  let { email, password } = req.body;
  // removing whitespaces
  email = email.trim();
  password = password.trim();
  const user = await userModel.findOne({ email });
  // check user & password match
  if (user && (await bcrypt.compare(password, user.password))) {
    //if the user is present and has matched with the password in theDB
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), //will generate a token and send as response as well.
    });
  } else {
    res.status(401);
    throw new Error('Invalid credential given');
  }
});
// @desc : Get user data
// @route : /api/users/me
// @access : Private (token needed)
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SCRECT, {
    expiresIn: '69d',
  });
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
