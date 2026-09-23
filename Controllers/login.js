const router = require('express').Router();
const {User} = require('../Models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {SECRET} = require('../utils/config')

router.post('/', async(req,res,next)=>{

    const {username, password} = req.body

    const user = await User.findOne({where:{username}});

    // console.log(user)
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
    
    console.log(passwordCorrect)
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        }).end()
    }
    const userForToken = {
        username: user.username,
        id: user.id,
    }
    
      const token = jwt.sign(userForToken,SECRET)
    res
    .status(200)
    .send({ token, username: user.username, name: user.name })

})

module.exports = router;