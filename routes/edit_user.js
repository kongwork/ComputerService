const express = require("express")
const router = express.Router()
const User = require("../models/user")


router.post("/edit", (req, res) => {
    const edit_user = req.body.edit_user
    const showname = req.session.username
    if (req.session.login) {
        User.findOne({ _id: edit_user }).exec((err, doc) => {
            res.render("edit_user", { user: doc, showname: showname })
        })
    }
    else {
        res.redirect('/')
    }
})

// Update Data User
router.post("/update", (req, res) => {
    // ข้อมูลใหม่ที่ส่งมาจาก form edit
    const update_user = req.body.user_id
    let data = {
        Prefix: req.body.Prefix,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        UserName: req.body.UserName,
        Email: req.body.Email,
        PhoneNumber: req.body.PhoneNumber,
        Password: req.body.Password,
        TypeUser: req.body.TypeUser
    }
    // อัพเดตข้อมูล User
    User.findByIdAndUpdate(update_user, data, { useFindAndModify: false }).exec(err => {
        res.redirect("/user")
    })
})

module.exports = router;