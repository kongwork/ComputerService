const express = require("express")
const router = express.Router()
const Category = require("../models/category")
const Device = require("../models/device")

router.get("/user_category", (req, res) => {
    const showname = req.session.username
    if (req.session.login && req.session.typeUser === 'User') {
        Device.find().exec((err, device) => {
            Category.find().exec((err, doc) => {
                res.render("user_category", {
                    devices: device,
                    categorys: doc,
                    order: 1,
                    showname: showname })
            })
        })
    }
    else {
        res.redirect('/')
    }
})

module.exports = router