const express = require('express')
const app = express()

// oda libraries
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const PORT = process.env.PORT || 8800
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")


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

// routes: moved to route
// app.get('/', (req, res) => {
//           res.send("Welcome to homepage")
// })

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)

app.listen(PORT, ()=> {
          console.log(`Backend server is running: ${PORT}`);
})