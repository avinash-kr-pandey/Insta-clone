const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Post = mongoose.model("Post")
const requireLogin = require('../middleware/requireLogin')

router.get('/allpost', requireLogin,(req, res)=>{
    this.post.find()
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post("/createpost",requireLogin, (req, res)=>{
    const {title, body, photo} = req.body
        if(!title || !body){
            return res.status(400).json({error: "Please add all the filds"})
        }
        const post = new Post({
            title,
            body,
            postedBy: req.user
        })
        post.save()
        .then((savePost)=>{
            res.json({message: "Post created successfully", post: savePost})
        })
        .catch(err=>{
            console.log(err)
        })
})


module.exports = router