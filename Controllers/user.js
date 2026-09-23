const router = require('express').Router()
const {User} = require('../Models')
const bcrypt = require('bcrypt')

router.get('/',async(req,res)=>{
    try{
        const users = await User.findAll({attributes:{exclude:['passwordHash']}});
        res.send(users);
    }catch(error){
        res.status(404).json(error)
    }
})

router.get('/:id',async (req,res,next)=>{
    try{
        const user = await 
        User.findByPk(
            req.params.id,
           {attributes:{
            exclude:['passwordHash']
           }}
        );
        if(!user){
            return res.status(404).json({message:'wrong user id'}).end()
        }
        res.send(user)
    }catch(error){
        next(error)
    }
})

router.post('/',async(req,res,next)=>{

    const {username, name, password} = req.body;
    const saltRound = 10;
    const passwordHash = await bcrypt.hash(password,saltRound)
    try{
        const newUser = await User.create({username,name,passwordHash})
        res.send(newUser);
    }catch(error){
        next(error)
    }
})

router.put('/:username', async(req,res,next)=>{
    const username = req.params.username
    const user = await User.findOne({where:{username},attributes:{exclude:['passwordHash']}})

    if(!user){
        res.status(404).json({message:'No user found'}).end();
    }
    try{
        user.name = req.body.name
        await user.save()
        res.status(201).json(user)
    }catch(error){
        next(error)
    }

})
module.exports = router