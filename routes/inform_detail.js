const express = require("express")
const router = express.Router()
const Maintenance = require("../models/maintenance")
const User = require("../models/user")

router.post("/inform_detail/:id", (req, res) => {
    const showname = req.session.username
    Maintenance.findOne({ _id: req.params.id }).exec((err, maintenance) => {
        User.findOne({ _id: maintenance.UserID }).exec((err, user) => {
            res.render('inform_detail', {
                showname: showname,
                mtn: maintenance,
                user: user
            })
            console.log(user)
        })
    })
})

module.exports = router