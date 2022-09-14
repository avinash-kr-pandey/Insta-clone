const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { JWT_SECRET } = require('../secret')
const User = mongoose.model("User")

module.exports = (req, res, next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(400).json({error: "You must be logined in"})
    }
    const token = authorization.replace("Bearer ","")
    // console.log(token)
    jwt.verify(token, JWT_SECRET, (err, payload)=>{
        if(err){
            return res.status(400).json({error: "You must be logined in"})
        }
        const {_id} = payload
        User.findById(_id)
        .then(userdata=>{
            req.user = userdata;
            next();
        });
    });
}



