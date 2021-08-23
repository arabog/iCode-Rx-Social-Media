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

const path = require("path")


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

app.use("/images", express.static(path.join(__dirname, "public/images")))

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

const storage = multer.diskStorage({
          destination: (req, file, cb) => {
                    cb(null, "public/images")
          },

          filename: (req, file, cb) => {
                    cb(null, req.body.name)
          }
})

const upload = multer( { storage } )
app.post("/api/upload", upload.single("file"), (req, res) => {
          try {
                    return res.status(200).json("File uploaded successfully")
          } catch (err) {
                    console.log(err);
          }
})

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use("/api/posts", postRoute)

app.listen(process.env.PORT || PORT, ()=> {
          console.log(`Backend server is running: ${PORT}`);
})

