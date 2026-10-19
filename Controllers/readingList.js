const router = require('express').Router()
const { User,Blog,ReadingList } = require('../Models')
const { SessionValidity, TokenExtractor } = require('../Middleware')
const CustomError = require('../utils/CustomError')
router.post('/', async (req,res,next) => {

  try{

    const { userId, blogId } = req.body
    if(!userId || !blogId){
      throw new CustomError('missing BlogId or UserId',400)
    }

    const user = await User.findByPk(userId,{ attributes:{ include:['id'] } })
    const blog = await Blog.findByPk(blogId,{ attributes:{ include:['id'] } })

    if(!user || !blog ){
      throw new CustomError('ressource not found',404)
    }

    const isExist = await ReadingList.findOne({ where:{
      blogId:blogId, userId:userId
    } })

    console.log('is Exist',isExist)
    if(isExist){
      return res.status(400).json({ error:'ressource cannot be duplicated' }).end()
    }

    const newReadingList = await ReadingList.create({ blogId:blogId,userId:userId })
    res.json(newReadingList)

  }catch(error){

    next(error)
  }

})


router.put('/:id',TokenExtractor,SessionValidity, async( req, res,next) => {

  console.log(req.params)
  console.log(req.body)

  try{

    if(!req.params || req.body.read === undefined){
      return res.status(400).json({ error:'malformed request' })
    }

    const user_blog = await  ReadingList.findByPk(req.params.id)

    if(!user_blog){
      return res.status(404).json({ error: 'No record found' }).end()
    }

    if(user_blog.userId !== req.decodedToken.id){
      throw new CustomError('You didnt have right on this ressource',401)
    }
    console.log(user_blog)
    user_blog.read = req.body.read
    const update = await user_blog.save()

    return res.json({ read:update.read }).end()
  }catch(err){
    next(err)
  }

})

module.exports = router