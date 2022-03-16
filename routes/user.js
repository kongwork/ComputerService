const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.get("/user", (req, res) => {
    const showname = req.session.username
    if (req.session.login && req.session.typeUser === 'Admin') {
        let order = 1
        User.find().exec((err, doc) => {
            res.render("user", { users: doc, order: order, showname: showname })
        })
    }
    else {
        res.redirect('/')
    }
})

module.exports = router