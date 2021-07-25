const router = require("express").Router()
const Post = require("../models/Post")

// cr8 a post
/*
http://localhost:8800/api/posts
{
          "userId": "60fda89a9b52a432b3d42104",
          "desc": "Hey my first post"
}
*/ 
router.post('/', async (req, res) => {
          const newPost = new Post(req.body)

          try {
                    const savedPost = await newPost.save()

                    res.status(200).json(savedPost)
          } catch (err) {
                    res.status(500).json(err)
          }
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
                              await post.updateOne({$set: req.body})

                              res.status(200).json("the post has been updated")
                    }else {
                              res.status(403).json("you can update only your post")
                    }
          } catch (err) {
                    res.status(500).json(err)
          }
})

// del a post

// like a post

// get a post

// get timeline posts

module.exports = router;