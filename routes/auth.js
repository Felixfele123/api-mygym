const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");



router.get("/", (req, res) => {

    const token = req.cookies.token;
    // om det finns en cookie med namnet token
    if(token)
    {
        console.log("!")
        try {
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
})

module.exports = router; 