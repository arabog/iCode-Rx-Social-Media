const router = require("express").Router()
const Post = require("../models/Post")
const User = require("../models/User")


/* ths done in post.js
Create: put
Read: get
U: update
D: del

*/


// cr8 a post
/*
http://localhost:8800/api/posts
{
          "userId": "60fda89a9b52a432b3d42104",
          "desc": "Hey my first post"
}

*/ 
router.post('/', async (req, res) => {
          // newPost can be either way here
          const newPost = await new Post(req.body)

          try {
                    // const newPost = await new Post(req.body)
                    const savedPost = await newPost.save()

                    res.status(200).json(savedPost)
          } catch (err) {
                    res.status(500).json(err)
          }
})

// get all post: personal effort
// http://localhost:8800/api/posts/

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
/*
http://localhost:8800/api/posts/id
http://localhost:8800/api/posts/60fdc2e4a4386a3d945cfaff

{
          "userId": "60fda89a9b52a432b3d42104",
          "desc": "Hey my first post has just been updated"
}
notice dt d id is different 4rm userId
u send userId with ur request while "/:id" is d db id
_id: ObjectId("60fdc2e4a4386a3d945cfaff") 

*/ 
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
/*
http://localhost:8800/api/posts/60fdc2e4a4386a3d945cfaff
{
          "userId": "60fda89a9b52a432b3d42104",
          "desc": "Hey my first post has just been updated"
}

*/ 
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
/*
http://localhost:8800/api/posts/60fdc303a4386a3d945cfb01/like
{
          "userId": "60fda89a9b52a432b3d42104"
}

*/ 
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
/*
http://localhost:8800/api/posts/60fdc303a4386a3d945cfb01/
d id here is d _id: ObjectId("60fdc2e4a4386a3d945cfaff") 

*/
router.get('/:id', async (req, res) => {
          try {
                    const post = await Post.findById(req.params.id)

                    res.status(200).json(post)
          } catch (err) {
                    res.status(500).json(err)
          }
})


// get timeline posts
/*
1.
http://localhost:8800/api/posts/
d userId in ds case is d _id from db

{
          userId: "60fdd13c0b9c1f431b30c6bb"
          "desc": "Hey my first post"
}

{
          "userId": "60fdd1b40b9c1f431b30c6bd",
          "desc":"Hey my first post 222"
}

{
          "userId": "60fdc303a4386a3d945cfb01",
          "desc": "Hey my second post 123"
}

{
          "userId": "60fdd1e60b9c1f431b30c6bf"
          "desc": "Hey my second post 123"
}

// dse 
http://localhost:8800/api/posts/timeline/all
userId for my first post and d userId is not _id
{
          "userId": "60fda89a9b52a432b3d42104"
}

returns:
[
          {
                    "likes": [
                              "60fda89a9b52a432b3d42104"
                    ],
                    "_id": "60fdc303a4386a3d945cfb01",
                    "userId": "60fda89a9b52a432b3d42104",
                    "desc": "Hey my second post",
                    "img": "image.png",
          },

          {
                    "likes": [],
                    "_id": "60fdd13c0b9c1f431b30c6bb",
                    "userId": "60fda89a9b52a432b3d42104",
                    "desc": "Hey my first post",
          }
]

what does d get (a timeline: post cr8ed only by ds user & 
its followers) method of post route entails?

*/ 
router.get("/timeline/all", async (req, res) => {

          try {
                    const currentUser = await User.findById(req.body.userId)

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

                    res.json(userPosts.concat(...friendPosts))
          } catch (err) {
                    res.status(500).json(err)         
          }
})



module.exports = router;