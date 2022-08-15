const {User} = require('../models/user'); 
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", async (req,res) => {
    res.send("pres")
})

router.post("/", async (req,res) => {
    console.log(req.headers)
    let user = await User.find( { username: req.body.username } )
    if(user.length === 1)
    {
        try {
            const pwCheck = await bcrypt.compare(req.body.password,user[0].password);
            if(pwCheck){
                let userObject = {
                    uid:user[0]._id,
                    admin:false,
                    username:user[0].username,
                    types: user[0].types
                }
                const token = jwt.sign(userObject, process.env.FIRSTSECRET, {expiresIn:120000});
                res.cookie('token',token,{httpOnly:true,sameSite:'strict'});
                res.send(userObject);
            }
            else{
                res.redirect("/login?mes=loginError");
            }
        } catch (error) {
            res.send(error.message);
        }
    }
    else{
        res.send("user not found")
    }
});



module.exports = router; 