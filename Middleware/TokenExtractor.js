const jwt = require('jsonwebtoken');
const {SECRET} = require('../utils/config');

const tokenExtractor = async (req,res,next)=>{

const authorization = req.get('authorization');

try{
    if(!authorization && !authorization?.toLowerCase().startsWith('bearer ')){
        throw new Error('Missing token')
    }
    req.decodedToken = jwt.verify(authorization.substring(7),SECRET);

    next()
}catch(error){
    return next(error)
}
}

module.exports = tokenExtractor