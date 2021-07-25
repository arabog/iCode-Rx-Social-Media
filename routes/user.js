const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

// router.get('/', (req, res) => {
//           res.send('Hey it\'s users route')
// }) 

// cr8 user has already been handled by auth.js
// update user:
/*
http://localhost:8800/api/users/60fc679818ab284f34283be1
{
          "userId": "60fc679818ab284f34283be1",
          "desc": "Hey it my description"
}
*/
router.put('/:id', async (req, res) => {
          // userId rep id associated with user, req.params.id: 4rm db
          // both will be d same wn it is d correct user
          if(req.body.userId === req.params.id || req.body.isAdmin) {
                    if(req.body.password) { // d password supplied by d user
                              try {
                                        const salt = await bcrypt.genSalt(10)
                                        req.body.password = await bcrypt.hash(req.body.password, salt)
                              }catch(err) {
                                        return res.status(500).json(err)
                              }
                    }

                    try {
                              const user = await User.findByIdAndUpdate(req.params.id, 
                                        {
                                                  $set: req.body,
                                        }          
                              )

                              res.status(200).json("Account has been updated")
                    } catch (err) {
                              return res.status(500).json(err)
                    }

          }else {
                    return res.status(403).json("You can update only your account!")
          }
})

// del user
/*
http://localhost:8800/api/users/60fc679818ab284f34283be1
{
    "userId": "eieieie"
}
"You can delete only your account!"
*/
router.delete('/:id', async (req, res) => {
          if(req.body.userId === req.params.id || req.body.isAdmin) {

                    try {
                              // await User.deleteOne({_id: req.params.id})
                              await User.findByIdAndDelete(req.params.id)

                              res.status(200).json("Account has been deleted")
                    } catch (err) {
                              return res.status(500).json(err)
                    }

          }else {
                    return res.status(403).json("You can delete only your account!")
          }
})

// get a user
// follow a user
// unfollow a user

module.exports = router