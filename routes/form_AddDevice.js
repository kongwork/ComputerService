const express = require("express")
const router = express.Router()
const Category = require("../models/category")
const Device = require("../models/device")

router.get("/form_AddDevice", (req, res) => {
    const showname = req.session.username
    if (req.session.login && req.session.typeUser === 'Admin') {
        Category.find().exec((err, doc) => {
            res.render("form_AddDevice", { categorys: doc, showname: showname })
        })
    }
    else {
        res.redirect('/')
    }
})

router.post("/insertDevice", (req, res) => {
    console.log(req.body)
    Device.findOne({ DeviceCode: req.body.device_code }).exec((err, doc) => {
        Category.findOne({ _id: req.body.category_id }).exec((err, doc_c) => {
            if (!doc) {
                let data = new Device({
                    CategoryID: req.body.category_id,
                    DeviceName: req.body.device_name,
                    CategoryName: doc_c.CategoryName,
                    DeviceCode: req.body.device_code,
                    Room: req.body.room,
                    Price: req.body.price,
                    Date: req.body.date,
                    DeviceStatus: req.body.status
                })
                Device.saveDevice(data, (err) => {
                    if (err) {
                        res.redirect("/form_AddDevice")
                        console.log(err)
                    }
                    else {
                        res.redirect("/device")
                    }
                })
            }
            else {
                res.redirect("/form_AddDevice")
            }
        })
    })
})

module.exports = router