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


// del a post

// like a post

// get a post

// get timeline posts

module.exports = router;