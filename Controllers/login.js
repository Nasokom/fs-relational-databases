const router = require('express').Router()
const { User,Session } = require('../Models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

router.post('/', async(req,res) => {

  const { username, password } = req.body

  const user = await User.findOne({ where:{ username } })
  // console.log(user)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
    
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    }).end()
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = await jwt.sign(userForToken,SECRET)

  //const session = await Session.findOrCreate({ where:{ userId:user.id, token } })
  const session = await Session.create({ userId:user.id, token })
  res
    .status(200)
    .send({ token:session.token, username: user.username, name: user.name })

})

module.exports = router