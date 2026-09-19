require('dotenv').config()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
//   dialectOptions: {
//     ssl: {
//       require: false,
    //   rejectUnauthorized: false
//     }
//   }
})



const main = async () => {
  try {
    const blogs = await sequelize.query('SELECT * from blogs');
    console.log(blogs[0])
    sequelize.close()
  } catch (error) {
    console.error('Problem:', error)
  }
}

main()


// app.use(express.json())

