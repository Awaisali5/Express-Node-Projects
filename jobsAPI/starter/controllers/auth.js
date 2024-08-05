const { any } = require("joi");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError , UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");



const register = async (req, res) => {
  // bcrypt

  //     const {name, email, password} = req.body

  // // to bcrypt the password in the database
  // // random byte from salt
  //     const salt = await bcrypt.genSalt(10);

  //     // hash method looking for the password and salt
  //     const hashedPassword= await bcrypt.hash(password, salt)
  //     const tempUser = {name, email, password:hashedPassword}

  // custom error generate

  // if(!name || !email || !password){

  //     throw new BadRequestError('Please provide name, email, and password')
  // }

  const user = await User.create({ ...req.body });
 const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName() }, token });
};

// Login 

const login = async (req, res) => {
  const {email, password} = req.body;
  if(!email || !password){
    throw new BadRequestError('please Provide email and Password')
  }


  const user= await User.findOne({email})

  
  
  
  
  
  // if user provided invalid email or password 
  
  if(!user){
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password 
  const isPasswordCorrect = await user.comparePassword(password)
  if(!isPasswordCorrect){
    throw new UnauthenticatedError('Invalid Credentials')
  }

  // setting up the token 

  const token= user.createJWT();
  res.status(StatusCodes.OK).json({user: {name:user.name}, token})


};



module.exports = {
  login,
  register,
};
