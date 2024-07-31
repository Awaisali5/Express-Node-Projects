console.log('Store API')
require('express-async-errors')
require('dotenv').config()
const notFoundMiddleware = require('./middleware/not-found')
const  errorMiddleware = require('./middleware/error-handler')

const connectDB = require('./db/connect')
const Products= require('./routes/products')


//async errors

const express = require('express')

const app = express()


// middleware 
app.use(express.json())

// route 
app.get('/', (req, res) => {
    res.send('<h1> Store API </h1> <a href="/api/v1/products">Products Route </a>')
})

//product route 

app.use('/api/v1/products',Products )



// other middleware 

app.use(notFoundMiddleware)
app.use(errorMiddleware)


const port = process.env.PORT || 4000


const start = async () => {
    try {
        // connect to DB
        await connectDB(process.env.MONGO_URL)
        
        app.listen(port, console.log(`Server is listening to port ${port} ....`))
        
    } catch (error) {
        console.log(`start method mai issue hai ${error}`)
        
    }
}


start()






