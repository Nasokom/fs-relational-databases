const { Session } = require('../Models')
const CustomError = require('../utils/CustomError')
const SessionValidity = async (req,res,next) => {

  try{
    const isSession = await Session.findOne({ where:{ userId:req.decodedToken.id } })

    if(!isSession){
      throw new CustomError('Insuffisent credential, you must login',401)
      // return res.send(401).json({ message: "Insuffisent credential, you must login"})
    }
    next()
  }catch(err){
    next(err)
  }

}


module.exports = SessionValidity