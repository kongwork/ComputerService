const express = require("express")
const router = express.Router()
const User = require("../../../models/user")
const Faculty = require("../../../models/faculties")
const Branch = require("../../../models/branches")



router.post("/edit", (req, res) => {
    const edit_user = req.body.edit_user
    const showname = req.session.username
    if (req.session.login) {
        User.findOne({ _id: edit_user }).exec((err, user) => {
            Faculty.findOne({ _id: user.FacultyID }).exec((err, find_faculty) => {
                Branch.findOne({ _id: user.BranchID }).exec((err, find_branch) => {
                    Faculty.find().exec((err, faculty) => {
                        Branch.find().exec((err, branch) => {
                            res.render("edit_user", {
                                faculty: faculty,
                                branch: branch,
                                find_faculty: find_faculty,
                                find_branch: find_branch,
                                user: user,
                                showname: showname
                            })
                        })
                    })
                })
            })
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