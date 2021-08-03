const router = require("express").Router()
const Post = require("../models/Post")
const User = require("../models/User")


// cr8 a post
router.post('/', async (req, res) => {
          // newPost can be either way here
          const newPost = await new Post(req.body)

          try {
                    const savedPost = await newPost.save()

                    res.status(200).json(savedPost)
          } catch (err) {
                    res.status(500).json(err)
          }
})

// get all post: personal effort
router.get('/', async (req, res) => {

          Post.find({ }, (err, posts) => {
                    if(err) {
                              return res.status(500).json({message: err})
                    }else {
                              return res.status(200).json({posts})
                    }
          }) 
})

// update a post
router.put("/:id", async (req, res) => {
          try {
                    const post = await Post.findById(req.params.id)

                    if(post.userId === req.body.userId) {
                              await post.updateOne(
                                        {
                                                  $set: req.body
                                        }
                              )

                              res.status(200).json("the post has been updated")
                    }else {
                              res.status(403).json("you can update only your post")
                    }
          } catch (err) {
                    res.status(500).json(err)
          }
})

// del a post
router.delete('/:id', async (req, res) => {
          try {
                    const post = await Post.findById(req.params.id)

                    if(post.userId === req.body.userId) {
                              await post.deleteOne()

                              res.status(200).json("the post has been deleted")

                    }else {
                              res.status(403).json("you can delete only your post")
                    }
          } catch (err) {
                    res.status(500).json(err)
          }
})


// like/dislike a post
router.put('/:id/like', async (req, res) => {
          try {
                    const post = await Post.findById(req.params.id)

                    // like
                    if(!post.likes.includes(req.body.userId)) {
                              await post.updateOne(
                                        {
                                                  $push: {
                                                            likes: req.body.userId
                                                  }
                                        }
                              )

                              res.status(200).json("The post has been liked")
                    }else {
                              // unlike / dislike
                              await post.updateOne(
                                        {
                                                  $pull: {
                                                            likes: req.body.userId
                                                  }
                                        }
                              )

                              res.status(200).json("The post has been disliked")
                    }
          } catch (err) {
                    res.status(500).json(err)
          }
})

// get a post
router.get('/:id', async (req, res) => {
          try {
                    const post = await Post.findById(req.params.id)

                    res.status(200).json(post)
          } catch (err) {
                    res.status(500).json(err)
          }
})


// get timeline posts
router.get("/timeline/:userId", async (req, res) => {

          try {
                    const currentUser = await User.findById(req.params.userId)

                    // owner of d accout: person being followed
                    const userPosts = await Post.find(
                              {
                                        userId: currentUser._id
                              }
                    )

                    // posts of d pple d owner ffl
                    const friendPosts = await Promise.all(
                              currentUser.followings.map(friendId => {
                                        return Post.find(
                                                  {
                                                            userId: friendId
                                                  }
                                        )
                              })
                    )

                    res.status(200).json(userPosts.concat(...friendPosts))
          } catch (err) {
                    res.status(500).json(err)         
          }
})

// get user all post 
// profile posts
router.get('/profile/:username', async(req, res) => {
          try {
                    const user = await User.findOne({username: req.params.username})
                    const posts = await Post.find({userId: user._id})
                    res.status(200).json(posts)

          } catch (err) {
                    res.status(500).json(err)
          }
})


router.get('/deleteEmptyPosts/all', async (req, res) => {
          try {
                    const posts = await Post.find({desc: '', img: {$exists: false}})
                    const deleted = await Promise.all (
                              posts.map((p) => {
                                        return p.deleteOne()
                              })
                    )

                    res.status(200).json("ok")
          } catch (err) {
                    res.status(500).json(err)
          }
} )

module.exports = router;