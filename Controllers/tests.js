const router = require('express').Router();
const {sequelize} = require('../utils/db')
const {TESTING} = require('../utils/config')
const {User,Blog} = require('../Models')

router.get('/',async(req,res)=>{
    res.status(200).end()
})

router.post('/api/reset', async (req,res,next)=>{
    console.log(TESTING)

    if(!TESTING){
        return res.status(401).json({message:'not allow'}).end()
    }
    try{

        //  const x = await sequelize.query('DROP TABLE blogs CASCADE; DROP TABLE users CASCADE;')
        await Blog.drop();
        await User.drop();
        await sequelize.drop();
        await User.sync({force:true,alter:true})
        await Blog.sync({force:true,alter:true})
        // console.log(x);
        return res.status(200).json({message:'Success reset of the database'})
    }catch(error){
        next(error)
    }
})



module.exports = router;