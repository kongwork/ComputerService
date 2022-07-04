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
            if (username === doc.UserName && password === doc.Password && doc.TypeUser == '01') {
                req.session.userid = doc._id
                req.session.username = username
                req.session.password = password
                req.session.fname = doc.FirstName
                req.session.lname = doc.LastName
                req.session.phone = doc.PhoneNumber
                req.session.typeUser = 'User'
                req.session.login = true
                res.redirect("/list_inform")
            }
            else if (username === doc.UserName && password === doc.Password && doc.TypeUser == '00') {
                req.session.username = username
                req.session.password = password
                req.session.fname = doc.FirstName
                req.session.lname = doc.LastName
                req.session.phone = doc.PhoneNumber
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