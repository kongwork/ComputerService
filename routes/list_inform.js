const express = require("express")
const router = express.Router()
const Device = require("../models/device")
const Category = require("../models/category")
const Maintenance = require("../models/maintenance")


router.get("/list_inform", (req, res) => {
    const showname = req.session.username
    let order = 1
    if (req.session.login && req.session.typeUser === 'User') {
        Maintenance.find().exec((err, doc) => {
            res.render('list_inform', {
                MTN: doc,
                order: order,
                showname: showname
            })
        })
    }
    else {
        res.redirect('/')
    }
})

module.exports = router;