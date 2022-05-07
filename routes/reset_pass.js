const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.post("/reset_pass", (req, res) => {
    // ข้อมูลที่ส่งมาจาก form edit
    const pass = req.body.pass
    const pass_confirm = req.body.pass_confirm;
    const email = req.cookies.email
    if (pass === pass_confirm) {
        let data = {
            password: req.body.pass_confirm,
        };
        User.findOneAndUpdate(email, data, { useFindAndModify: false }).exec(err => {
            /*res.clearCookie("email")
            res.clearCookie("changepass")*/
            req.session.destroy((err) => {
                res.redirect("/")
            })
            //res.redirect("/")
        })
    }
    /*let data = {
      password: req.body.password,
    }
    // อัพเดตข้อมูล User
    User.findByIdAndUpdate(email,data,{useFindAndModify:false}).exec(err => {
      res.redirect("/user")
    })*/
})

module.exports = router