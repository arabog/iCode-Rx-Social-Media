const User = require("../models/User")
const router = require("express").Router()
const bcrypt = require("bcrypt")

/*
ths done in user route
cr8 user has already been handled by auth.js

read: get
delete: del
update: put (to update text/post, un(follow))
*/ 

// ******************************************

// get a user
/*
Register a user
dn use ds in userId
http://localhost:8800/api/users/id
e.g: id = 60fda19b8455a0309e48084d
*/ 

router.get('/', async (req, res)=> {

        const userId = req.query.userId;
        const username = req.query.username

        try {
                const user = await User.findById(req.params.id)
                // return res.status(200).json(user)

                // to hide some ppties like password do ds
                const {password, updatedAt, ...other} = user._doc

                return res.status(200).json(other)
                // ds means password & updatedAt will not show

        } catch (err) {
                return res.status(500).json(err)
        }
})

/*
Route parameters:
Route parameters are named URL segments that are used to 
capture the values specified at their position in the URL. 
The captured values are populated in the req.params object, 
with the name of the route parameter specified in the path as 
their respective keys.

Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
To define routes with route parameters, simply specify the route 
parameters in the path of the route as shown below.

app.get('/users/:userId/books/:bookId', function (req, res) {
        res.send(req.params)
})

The name of route parameters must be made up of “word characters” 
([A-Za-z0-9_]).
Since the hyphen (-) and the dot (.) are interpreted literally, they 
can be used along with route parameters for useful purposes.
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }

Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }

To have more control over the exact string that can be matched 
by a route parameter, you can append a regular expression in 
parentheses (()):
Route path: /user/:userId(\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}
Because the regular expression is usually part of a literal string, 
be sure to escape any \ characters with an additional backslash, 
for example \\d+.

In Express 4.x, the * character in regular expressions is not interpreted 
in the usual way. As a workaround, use {0,} instead of *. This will likely 
be fixed in Express 5.

*/ 

// del user
/*
http://localhost:8800/api/users/60fc679818ab284f34283be1
{
        "userId": "eieieie"
}
"You can delete only your account!"


req.body contains key-value pairs of data (4rm model?) submitted 
in the request body. By default, it is undefined, and is populated when 
you use body-parsing middleware such as body-parser and multer.
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

// update user:
/*
http://localhost:8800/api/users/60fc679818ab284f34283be1
{
        "userId": "60fc679818ab284f34283be1",
        "desc": "Hey it my description"
}


what does dse do?
$set: add to d (entirety) body of a request
$push: add to a particular part of d request eg follower/following
$pull: remove from a particular part of d request eg follower/following
*/
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
/*
http://localhost:8800/api/users/60fda89a9b52a432b3d42104/unfollow
{
        "userId": "60fdac0ecad84234343d9c72"
}

what does a user put(unfollow a user) router entails

*/ 

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