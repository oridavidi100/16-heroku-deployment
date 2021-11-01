const express = require('express');
const router = express.Router();


//Return user name
router.post("/", (req, res)=> {
    const userName = req.headers.username; //get user name
    res.json({"username": userName});
})

module.exports = router;
