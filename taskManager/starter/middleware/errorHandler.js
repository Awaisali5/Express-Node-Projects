const {customeAPIError} = require('../Errors/customError')


const errorHandlemiddleware = (err, req, res, next) => {
    if(err instanceof customeAPIError){
        return res.status(err.statusCode).json({msg: err.massage})
    }

    return res.status(500).json({msg: `Something went wrong yr, Take a break`})
}

module.exports = errorHandlemiddleware