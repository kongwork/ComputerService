const express = require("express")
const router = express.Router()
const Device = require("../../models/device")
const Category = require("../../models/category")

router.get("/user_category/page-user-category/:id", (req, res) => {
    const showname = req.session.username
    if (req.session.login && req.session.typeUser === 'User') {
        Category.findOne({ _id:req.params.id }).exec((err, category) => {
            Device.find({ CategoryID: category._id }).exec((err, device) => {
                res.render("view_category_device", {
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