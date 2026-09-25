const {sequelize} = require('../utils/db')
const Blog = require('../Models/Blog');
const router = require('express').Router();


router.get('/',async (req,res)=>{

    const authors = await Blog.findAll({
        attributes:['author',
            [sequelize.fn('COUNT',sequelize.col('likes')),'blogs'],
            [sequelize.fn('SUM',sequelize.col('likes')),'likes']
        ],
        group:['author'],
        order:[['likes','ASC']]
    }
    )
    // const [results,metadata] = await sequelize.query('select author,count(title) as blogs, sum(likes) as likes from blogs group by author ORDER BY likes ASC;')
    res.send(authors)
})

module.exports = router;