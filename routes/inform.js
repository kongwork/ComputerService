const express = require("express")
const router = express.Router()
const Device = require("../models/device")
const Category = require("../models/category")
const Maintenance = require("../models/maintenance")


router.post("/user_device/inform", (req, res) => {
    const edit_device = req.body.edit_device
    const showname = req.session.username
    if (req.session.login) {
        Device.findOne({ _id: edit_device }).exec((err, doc_d) => {
            Category.find().exec((err, doc_c) => {
                Category.findOne({ _id: doc_d.CategoryID }).exec((err, cate) => {
                    res.render("inform", {
                        cate: cate,
                        devices: doc_d,
                        categorys: doc_c,
                        showname: showname
                    })
                })
            })
        })
    }
    else {
        res.redirect('/')
    }
})

router.post("/updateInform", (req, res) => {
    Maintenance.findOne({ DeviceID: req.body.device_code }).exec((err, doc) => {
        if (!doc) {
            let data = new Maintenance({
                UserID: req.session.userid,
                UserInform: req.session.username,
                DeviceID: req.body.device_code,
                DeviceName: req.body.device_name,
                MTN_Status: 'รอดำเนินการ',
                MTN_Room: req.body.room,
                MTN_Date: Date.now(),
                MTN_CheckDate: '',
                MTN_Img: req.body.MTN_Img,
                MTN_Detail: req.body.MTN_Detail
            })
            Maintenance.saveMaintenance(data, (err) => {
                if (err) console.log(err)
                res.redirect("/user_device")
            })
        }
        else {
            
        }
    })
})

module.exports = router;