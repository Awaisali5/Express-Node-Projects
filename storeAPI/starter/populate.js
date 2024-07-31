require('dotenv').config()

const connectDB = require('./db/connect')

const Product = require('./models/product')

const jsonProduct = require('./products.json')



const start = async () => {
    try {
        // connect to DB
        await connectDB(process.env.MONGO_URL)
        await Product.deleteMany();
        await Product.create(jsonProduct)

        console.log('Successfully connected to the DB')
        process.exit(0)
        
    } catch (error) {
        console.log(`start method mai issue hai ${error}`)
        process.exit(1)
    }
}


start()