const express = require("express")
const router = express.Router()
const User = require("../../models/user")

router.get("/user", (req, res) => {
    const showname = req.session.username
    const fname = req.session.fname
    const lname = req.session.lname
    if (req.session.login && req.session.typeUser === 'Admin') {
        let order = 1
        User.find().exec((err, doc) => {
            res.render("user", {
                users: doc,
                order: order,
                showname: showname,
                fname: fname,
                lname: lname
            })
        })
    }
    else {
        res.redirect('/')
    }
})

module.exports = router