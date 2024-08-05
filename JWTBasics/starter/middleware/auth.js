const jwt = require('jsonwebtoken')
const customAPIError = require('../errors/custom-error')
const {UnauthenticatedError} = require('../errors')



const authenticationMiddleware = async (req, res, next) => {
    
    const authHeader = req.headers.authorization;


  if(!authHeader || !authHeader.startsWith('Bearer')){
    throw new UnauthenticatedError('No Token Provided')
  }

const Token = authHeader.split(' ')[1]

try {
    const decode = jwt.verify(Token, process.env.JWT_SECRET)
    const {id, username} = decode
    req.user = {id, username}
    next()


     
  } catch (error) {
    throw new UnauthenticatedError('Not Authorized to Access this route', 401)
    
  }
 
}


module.exports = authenticationMiddleware