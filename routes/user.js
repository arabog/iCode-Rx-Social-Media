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
/*
Register a user
dn use in userId here
http://localhost:8800/api/users/id
e.g: id = 60fda19b8455a0309e48084d
*/ 
router.get('/:id', async (req, res)=> {
          try {
                    const user = await User.findById(req.params.id)
                    // return res.status(200).json(user)

                    // to hide some ppties like password do ds
                    const {password, updatedAt, ...other} = user._doc

                    return res.status(200).json(other)

                    return res.status(200).json(user)
          } catch (err) {
                    return res.status(500).json(err)
          }
})

// follow a user
/*
person to follow:
http://localhost:8800/api/users/60fda89a9b52a432b3d42104/follow

follower id
{
          "userId": "60fda19b8455a0309e48084d"
}
*/ 
router.put("/:id/follow", async (req, res) => {
          if(req.body.userId !== req.params.id) {
                    try {
                              const user = await User.findById(req.params.id)

                              const currentUser = await User.findById(req.body.userId)

                              if(!user.followers.includes(req.body.userId)) {
                                        await user.updateOne(
                                                  {
                                                            $push: {
                                                                      followers: req.body.userId
                                                            }
                                                  }
                                        )

                                        await currentUser.updateOne(
                                                  {
                                                            $push: {
                                                                      followings: req.params.id
                                                            }
                                                  }
                                        )

                                        return res.status(200).json("user has been followed")

                              }else {
                                        return res.status(403).json("you already follow this user")
                              }
                                        

                    } catch (err) {
                              return res.status(500).json(err)
                    }
          }else {
                    res.status(403).json("you can't follow yourself")
          }
})

// unfollow a user
router.put("/:id/unfollow", async (req, res) => {
          if(req.body.userId !== req.params.id) {
                    try {
                              const user = await User.findById(req.params.id)

                              const currentUser = await User.findById(req.body.userId)

                              if(!user.followers.includes(req.body.userId)) {
                                        await user.updateOne(
                                                  {
                                                            $push: {
                                                                      followers: req.body.userId
                                                            }
                                                  }
                                        )

                                        await currentUser.updateOne(
                                                  {
                                                            $push: {
                                                                      followings: req.params.id
                                                            }
                                                  }
                                        )

                                        return res.status(200).json("user has been followed")

                              }else {
                                        return res.status(403).json("you already follow this user")
                              }
                                        

                    } catch (err) {
                              return res.status(500).json(err)
                    }
          }else {
                    res.status(403).json("you can't follow yourself")
          }
})

module.exports = router