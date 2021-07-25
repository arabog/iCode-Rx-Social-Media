const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

// router.get('/', (req, res) => {
//           res.send('Hey it\'s users route')
// }) 

// cr8 user has already been handled by auth.js
// update user
router.put('/:id', async (req, res) => {
          if(req.body.userId === req.params.id || req.user.isAdmin) {
                    if(req.body.password) {
                              try {
                                        const salt = await bcrypt.genSalt(10)
                                        req.body.password = await bcrypt.hash(req.body.password, salt)
                              }catch(err) {
                                        return res.status(500).json(err)
                              }
                    }
          }else {
                    return res.status(403).json("You can update only your account!")
          }
})
// del user
// get a user
// follow a user
// unfollow a user

module.exports = router