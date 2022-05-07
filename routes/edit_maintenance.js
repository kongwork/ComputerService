const express = require("express")
const router = express.Router()
const Maintenance = require("../models/maintenance")


router.post("/editMaintenance", (req, res) => {
    const showname = req.session.username
    if (req.session.login) {
        Maintenance.findOne({ _id: req.body.edit_maintenance }).exec((err, doc) => {
            res.render("edit_maintenance", { maintenance: doc, showname: showname })
        })
    }
    else {
        res.redirect('/')
    }
})

// Update Data Device
router.post("/updateMaintenance", (req, res) => {
    // ข้อมูลใหม่ที่ส่งมาจาก form edit
    Maintenance.findOne({ _id: req.body.maintenance_id }).exec((err, doc_c) => {
        let data = {
            MTN_Detail: req.body.detail
        }
        // อัพเดตข้อมูล Device
        Maintenance.findByIdAndUpdate( req.body.maintenance_id, data, { useFindAndModify: false } ).exec(err => {
            console.log(data)
            res.redirect("/Maintenance")
        })
    })
})

module.exports = router;