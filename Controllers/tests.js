const router = require('express').Router()
const { sequelize } = require('../utils/db')
const { TESTING } = require('../utils/config')
const { User,Blog,Session, ReadingList } = require('../Models')
const { rollbackMigration,runMigrations } = require('../utils/db')

router.get('/',async(req,res) => {
  res.status(200).end()
})

router.post('/api/reset', async (req,res,next) => {
  console.log(TESTING)

  if(!TESTING){
    return res.status(401).json({ message:'not allow' }).end()
  }
  try{
    // await connectToDatabase()
    // //  const x = await sequelize.query('DROP TABLE blogs CASCADE; DROP TABLE users CASCADE;')
    await ReadingList.drop({ force:true })
    await Blog.drop({ force:true })
    await Session.drop({ force:true })
    await User.drop({ force:true })
    //  await rollbackMigration()
    //  await sequelize.drop({force:true})
    await User.sync({ force:true })
    await Blog.sync({ force:true })
    await Session.sync({ force:true })
    await ReadingList.sync({ force:true })
    // await runMigrations()
    // console.log(x);
    return res.status(200).json({ message:'Success reset of the database' })
  }catch(error){
    next(error)
  }
})



module.exports = router