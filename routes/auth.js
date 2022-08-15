const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");



router.get("/", (req, res) => {
setTimeout(()=>{    
    const token = JSON.stringify(req.cookies.token);
    console.log(req.cookies)
    // om det finns en cookie med namnet token
    if(token)
    {
        try {
            console.log(process.env.FIRSTSECRET)
            const verified = jwt.verify(token,process.env.FIRSTSECRET);
            req.token = verified;
            res.send(verified);
        } catch (error) {
            res.send({message:"authentication required"});
        }
    }
    else{
        res.send("/login?mes=No_Token_Provided");
    }
    },10000)
})

module.exports = router; 