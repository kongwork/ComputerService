const express = require("express")
const router = express.Router()
const Device = require("../../../models/device")
const Category = require("../../../models/category")

router.get("/category/device/:id", (req, res) => {
    const showname = req.session.username
    if (req.session.login) {
        Category.findOne({ _id:req.params.id }).exec((err, category) => {
            Device.find({ CategoryID: category._id }).exec((err, device) => {
                res.render("view_device_in_category", {
                    type_user: req.session.typeUser,
                    category: category,
                    devices: device,
                    order: 1,
                    showname: showname
                })
            })
        })
    }
    else {
        res.redirect('/')
    }
})

module.exports = router