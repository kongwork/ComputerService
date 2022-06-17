const express = require("express")
const router = express.Router()
const Device = require("../models/device")
const Category = require("../models/category")
const Maintenance = require("../models/maintenance")


router.get("/list_inform", (req, res) => {
    const showname = req.session.username
    let order = 1
    if (req.session.login && req.session.typeUser === 'User') {
        Maintenance.find({ UserID: req.session.userid }).exec((err, doc) => {
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

router.get("/CancelInform/:id", (req, res) => {
    Maintenance.findByIdAndUpdate(req.params.id, { MTN_Status: "0" }).exec(err => {
        if (err) console.log(err)
        res.redirect('/list_inform')
    })
})

module.exports = router;