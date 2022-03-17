const express = require("express")
const router = express.Router()
const Category = require("../models/category")
const Device = require("../models/device")


router.post("/editCategory", (req, res) => {
    const edit_category = req.body.edit_category
    const showname = req.session.username
    if (req.session.login) {
        Category.findOne({ _id: edit_category }).exec((err, doc) => {
            res.render("edit_category", { category: doc, showname: showname })
        })
    }
    else {
        res.redirect('/')
    }
})

// Update Data Category
router.post("/updateCategory", (req, res) => {
    // ข้อมูลใหม่ที่ส่งมาจาก form edit
    const update_category = req.body.category_id
    let data = {
        CategoryName: req.body.category
    }
    // อัพเดตข้อมูล Category
    Category.findByIdAndUpdate(update_category, data, { useFindAndModify: false }).exec(err => {
        Device.updateMany({CategoryID:update_category}, data).exec(err => {
            console.log(req.body)
            res.redirect("/category")
        })
    })
})

module.exports = router;