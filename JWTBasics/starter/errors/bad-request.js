
const CustomAPIError = require('./custom-error')
const {statusCode} = require('http-status-codes')

class badRequest extends CustomAPIError {
    constructor(message) {
      super(message)
      this.statusCode = statusCode.BAD_REQUEST 
    
    }
  }
  
  module.exports = badRequest
  