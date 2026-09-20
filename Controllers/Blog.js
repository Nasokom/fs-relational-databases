const express = require('express');
const router = express.Router();
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

router.get('/:id', async ()=>{
    try{
        const id = req.params.id;
        const blog = await Blog.findByPk(id);
        console.log(JSON.stringify(blogs,null,2))
        return res.json(blog)
    }catch(error){
        console.error(error);
        res.send(404)
    }
})

router.post('/', async (req,res)=>{
    try{
        const newBlog = await Blog.create({...req.body})
        console.log(JSON.stringify(newBlog,null,2))
        return res.json(newBlog)
    }catch(error){
        if(error.errors){
            const errors = error.errors.map(e=>e.message).join(' ')
            console.log(errors)
            res.status(400).send(errors)
        }
            console.error(error)
    }   
})

router.delete('/:id', async (req,res)=>{
    const id = req.params.id
        try {
            const post = await Blog.findByPk(id)
            await post.destroy()
            res.send(404)
        } catch (error) {
            console.log('error')
            res.status(400).send('blog post not found')
        }
})

module.exports = router