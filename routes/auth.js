const router = require("express").Router()
// req schema
const User = require('../models/User')
const bcrypt = require("bcrypt")


/*
ths done in auth.js
post(create): register(sign up) and login(sign in)
*/ 
// register
/*
http://localhost:8800/api/auth/register
{
          "username": "hey",
          "email": "hey@gmail.com",
          "password": "123456"
}

*/ 
router.post('/register', async (req, res) => {
          // const user = await new User (
          //           {
          //                     username: "John2",
          //                     email: "john@gmail.com",
          //                     password: "123456"
          //           }
          // )

          // await user.save()
          // res.send("ok")


          try{
                    // 2: generate new password
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword =  await bcrypt.hash(req.body.password, salt)

                    // 0: cr8 new user
                    const newUser = await new User (
                              {
                                        username: req.body.username,
                                        email: req.body.email,
                                        // password: req.body.password,
                                        password: hashedPassword,
                              }
                    )

                    // 1:save user and respond
                    const user = await newUser.save()
                    res.status(200).json(user)

          }catch(err) {
                    res.status(500).json(err)
          } 
})

// login 
/*
http://localhost:8800/api/auth/login
{ 
          "email": "hey@gmail.com",
          "password": "123456"
}

what does d auth sign in entails?

*/ 
router.post("/login", async (req, res) => {
          try{
                    const user = await User.findOne({ email: req.body.email })
                    !user && res.status(404).json("user not found")

                    /*Can't dse: !user && res.status(404).json("user not found")
                    be written like ds:
                              if(!user) {
                                        res.status(404).json("user not found")
                              }

                    */ 

                    // compare password
                    const validPassword = await bcrypt.compare(req.body.password, user.password)
                    !validPassword && res.status(400).json("wrong password")

                    // correct username and password
                    res.status(200).json(user)

          } catch(err) {
                    // console.error(err);
                    res.status(500).json(err)
          }
})

module.exports = router 