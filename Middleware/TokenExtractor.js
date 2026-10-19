const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const CustomError = require('../utils/CustomError')

const tokenExtractor = async (req,res,next) => {

  const authorization = req.get('authorization')

  try{
    if(!authorization && !authorization?.toLowerCase().startsWith('bearer ')){
      throw new CustomError('Missing or Invalid token',401)
    }
    req.decodedToken = jwt.verify(authorization.substring(7),SECRET)
    next()
  }catch(error){
    next(error)
  }
}

module.exports = tokenExtractor