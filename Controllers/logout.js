const router = require('express').Router()
const { Session } = require('../Models')
const TokenExtractor = require('../Middleware/TokenExtractor')

router.delete('/',TokenExtractor,async (req,res,next) => {

  if(!req.decodedToken){
    return res.send(401).json({ error:'malformed request' })
  }

  try{
    const sessions = await Session.findAll({ where:{ userId:req.decodedToken.id } })

    if(!sessions){
      return res.status(404).json({ message:'no Session found' })
    }

    await Session.destroy({
      where: { user_id: req.decodedToken.id }
    })

    return res.status(204).json({ message:'Logout successful' })
  }catch(err){
    next(err)
  }
})

module.exports = router