const express = require('express')
const app = express()

// oda libraries/middlewares
const dotenv = require("dotenv")
const helmet = require("helmet")
const mongoose = require("mongoose")
const morgan = require("morgan")
// bcrypt is used in auth.js while nodemon is a dev package

const PORT = process.env.PORT || 8800

// import routes
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

// for img
const multer =require("multer")


dotenv.config();

mongoose
          .connect(process.env.MONGO_URL,  { 
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
          })
          
          .then(() => console.log("Connected to MongoDB"))
          .catch(err => console.error(err))

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use("/api/posts", postRoute)

app.listen(PORT, ()=> {
          console.log(`Backend server is running: ${PORT}`);
})

