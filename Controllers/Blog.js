const router = require('express').Router();
const Blog = require('../Models/Blog')


router.get('/',async (req,res)=>{
    try{
        const blogs = await Blog.findAll();
        console.log(JSON.stringify(blogs,null,2))
        return res.json(blogs)
    }catch(error){
        console.error(error);
        res.send(404)
    }
})


router.post('/', async (req,res,next)=>{
    try{
        const newBlog = await Blog.create({...req.body})
        console.log(JSON.stringify(newBlog,null,2))
        return res.json(newBlog)
    }catch(error){
        next(error)
        // if(error.errors){
        //     const errors = error.errors.map(e=>e.message).join(' ')
        //     console.log(errors)
        //     res.status(400).send(errors)
        // }
        //     console.error(error)
    }   
})

const blogFinder = async (req,res,next)=>{
    try{

        req.blog = await Blog.findByPk(req.params.id);
        if(!req.blog){
            throw new Error(['Funk rule'])
            // return res.status(404).send('blog post not found').end()
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


router.delete('/:id', blogFinder, async (req,res)=>{
            await req.blog.destroy()
            res.status(204).send('sucess delete')
})

router.put('/:id', blogFinder ,async (req,res,next)=>{
    try{

        const blog = req.blog;
        blog.likes ++;
        const savedBlog = await blog.save()
        res.json({likes:savedBlog.likes})
    }catch(error){
        next(error)
    }
})

module.exports = router