console.log("Task Manager App");

const express = require("express");
const router = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound= require('./middleware/notFound')
const errorHandlemiddleware= require('./middleware/errorHandler')


const app = express();

// middleware
app.use(express.static('./public'))
app.use(express.json());


//routers

app.use("/api/v1/tasks", router);


app.use(notFound);
app.use(errorHandlemiddleware)





// app.get('/api/v1/tasks') - get all the tasks
// app.post('/api/v1/tasks') - create a new tasks
// app.get('/api/v1/tasks/:id') - get get single tasks
// app.patch('/api/v1/tasks/:id') - update tasks
// app.delete('/api/v1/tasks/:id') - delete tasks

// app.get('/', (req,res) => {
//     res.send('Task Manager App');
// })

const port =process.env.PORT || 4000;

const start = async () => {
  try {
      await connectDB(process.env.MONGO_URL);
      app.listen(port, console.log(`server is listing on port ${port}...`));
    
  } catch (error) {
    console.log(`Error aa gaya ${error}`);
  }
};

start();

// connection the db
