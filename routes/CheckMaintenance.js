const express = require("express")
const router = express.Router()
const Maintenance = require("../models/maintenance")


router.post("/CheckMaintenance", (req, res) => {
    const showname = req.session.username
    if (req.session.login) {
        Maintenance.findOne({ _id: req.body.edit_maintenance }).exec((err, doc) => {
            res.render("CheckMaintenance", { maintenance: doc, showname: showname })
        })
    }
    else {
        res.redirect('/')
    }
})

// Confirm Check Device
router.post("/ConfirmMaintenance", (req, res) => {
    Maintenance.findOne({ _id: req.body.maintenance_id }).exec((err, doc_c) => {
        let data = {
            MTN_Detail: '03'
        }
        // อัพเดตข้อมูล Device
        Maintenance.findByIdAndUpdate( req.body.maintenance_id, data, { useFindAndModify: false } ).exec(err => {
            console.log(data)
            res.redirect("/Maintenance")
        })
    })
})

module.exports = router