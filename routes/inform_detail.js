const express = require("express")
const router = express.Router()
const Maintenance = require("../models/maintenance")

router.post("/inform_detail/:id", (req, res) => {
    const showname = req.session.username
    Maintenance.findOne({ _id: req.params.id }).exec((err, doc) => {
        res.render('inform_detail', {
            showname: showname,
            mtn: doc 
        })
    })
})

module.exports = router