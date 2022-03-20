const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    User.findOne({ UserName: username }).exec((err, doc) => {
        if (!doc || password != doc.Password) {
            req.session.login_fail = true
            req.session.cookie.maxAge = 1000;
            res.redirect('/')
        }
        else {
            if (username === doc.UserName && password === doc.Password && doc.TypeUser === 'User') {
                req.session.userid = doc._id
                req.session.username = username
                req.session.password = password
                req.session.typeUser = 'User'
                req.session.login = true
                res.redirect("/user_category")
            }
            else if (username === doc.UserName && password === doc.Password && doc.TypeUser === 'Admin') {
                req.session.username = username
                req.session.password = password
                req.session.typeUser = 'Admin'
                req.session.login = true
                res.redirect("/user")
            }
            else {
                res.redirect("/")
            }
        }
    })
})

module.exports = router