const express = require("express")
const router = express.Router()
const Device = require("../models/device")
const Category = require("../models/category")


router.post("/editDevice", (req, res) => {
    const edit_device = req.body.edit_device
    const showname = req.session.username
    if (req.session.login) {
        Device.findOne({ _id: edit_device }).exec((err, doc_d) => {
            Category.find().exec((err, doc_c) => {
                Category.findOne({ _id: doc_d.CategoryID }).exec((err, cate) => {
                    res.render("edit_device", { 
                        cate: cate,
                        lookup: doc_lookup,
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

// Update Data Device
router.post("/updateDevice", (req, res) => {
    // ข้อมูลใหม่ที่ส่งมาจาก form edit
    const update_device = req.body.device_id
    let data = {
        CategoryName: req.body.category
    }
    // อัพเดตข้อมูล Device
    Device.findByIdAndUpdate(update_device, data, { useFindAndModify: false }).exec(err => {
        console.log(req.body)
        res.redirect("/device")
    })
})

module.exports = router;