const User = require("../models/User")
const router = require("express").Router()
const bcrypt = require("bcrypt")

// get a user
router.get('/', async (req, res)=> {

        const userId = req.query.userId;
        const username = req.query.username

        try {
                const user = userId 
                                        ? await User.findById(userId)
                                        : await User.findOne({username: username})

                // to hide some ppties like password do ds
                const {password, updatedAt, ...other} = user._doc

                return res.status(200).json(other)
                // ds means password & updatedAt will not show

        } catch (err) {
                return res.status(500).json(err)
        }
})

// del user
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

// update user:
router.put('/:id', async (req, res) => {

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
                        // using d id in d browser"/:id" to find user instead of d id 4rm d body
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


// follow a user
router.put("/:id/follow", async (req, res) => {

                if(req.body.userId !== req.params.id) {

                        try {
                                // d person to be followed
                                const user = await User.findById(req.params.id) 

                                // d follower: d person who's ffg user
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

                        if(user.followers.includes(req.body.userId)) {
                                await user.updateOne(
                                                {
                                                        $pull: {
                                                                followers: req.body.userId
                                                        }
                                                }
                                )

                                await currentUser.updateOne(
                                                {
                                                        $pull: {
                                                                followings: req.params.id
                                                        }
                                                }
                                )

                                return res.status(200).json("user has been unfollowed")

                        }else {
                                return res.status(403).json("you already unfollow this user")
                        }
                                

                } catch (err) {
                        return res.status(500).json(err)
                }

        }else {
                res.status(403).json("you can't unfollow yourself")
        }

})

module.exports = router