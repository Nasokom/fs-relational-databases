const router = require('express').Router();
const {Blog,User} = require('../Models')
const tokenExtractor = require('../Middleware/TokenExtractor')
const {Op} = require("sequelize");

const options = { 
    include:{
        model:User,
        attributes:{
            exclude:['passwordHash']
        }
    },
    attributes:{
        exclude:['userId']
    },
    where:{}
};


router.get('/',async (req,res,next)=>{

    //Order DESC

    options.order = [['likes','DESC']]

    options.where={} //got to declare where obj to avoid persistent query params 

    if(req.query.search){
        options.where = {
            [Op.or]:[
                {title:{[Op.substring]:req.query.search}},
                {author:{[Op.substring]:req.query.search}}
            ],
        }
    }

    try{
        const blogs = await Blog.findAll(options);
        console.log(JSON.stringify(blogs,null,2))
        return res.json(blogs)
    }catch(error){
        next(error)
    }
})


router.post('/', tokenExtractor, async (req,res,next)=>{
    console.log(req.decodedToken)
    try{
        const newBlog = await Blog.create({...req.body,userId:req.decodedToken.id})
        console.log(JSON.stringify(newBlog,null,2))
        return res.json(newBlog)
    }catch(error){
        next(error)
 
    }   
})

const blogFinder = async (req,res,next)=>{
    try{

        req.blog = await Blog.findByPk(req.params.id,options);
        if(!req.blog){
            throw new Error(['Not found'])
        }
    }catch(error){
        next(error)
    }
    next()    
}

router.get('/:id', blogFinder ,async (req,res)=>{

    console.log(JSON.stringify(req.blog,null,2))
    res.json(req.blog)

})

router.put('/:id', blogFinder ,async (req,res,next)=>{

    try{
        const blog = req.blog;
        blog.likes += req.body.likes;
        const savedBlog = await blog.save()
        res.json({likes:savedBlog.likes})
    }catch(error){
        next(error)
    }
})

router.delete('/:id',tokenExtractor,blogFinder,  async (req,res,next)=>{
    try{
        if(req.blog.user.id == req.decodedToken.id){
            await req.blog.destroy()
            res.status(204).end()
        }
        throw new Error('Wrong credential')
    }catch(error){
        next(error)
    }

})
module.exports = router