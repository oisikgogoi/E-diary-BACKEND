//---------------------------------- importing all the files  -----------------------------------------

const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const userRoutes = require('./Routes/userRoutes')
const appRoutes = require('./Routes/appRoutes')
const cors = require("cors")

const app = express(); 

require('dotenv').config()            

//---------------------------------- middlewares -----------------------------------------

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//---------------------------------- connecting to mongodb  -----------------------------------------
mongoose.connect('mongodb+srv://oisik:diary123@diary.mdxzsvz.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });


//----------------------------------Routes-----------------------------------------------
//User Routes
app.use('/api/user/',userRoutes)

//App Routes
app.use('/api/note/',appRoutes)


//----------------------------------listenong to  app -----------------------------------------
app.listen(5000, () => {
  console.log('Server running on port 5000');
});

//----------------------------------handeling 404 error -----------------------------------------

app.use((req,res,next)=>{
  return res.status(404).send('404 , cant find the page u r looking for')
})

