const express = require("express")
const router = express.Router()
const User = require("../../../models/user")
const Faculty = require("../../../models/faculties")
const Branch = require("../../../models/branches")

router.get("/form_AddUser", (req, res) => {
    const showname = req.session.username
    Faculty.find().exec((err, faculty) => {
        Branch.find().exec((err, branch) => {
            if (req.session.login) {
                res.render("form_AddUser.ejs",{ 
                    faculty: faculty,
                    branch: branch,
                    showname: showname
                })
            }
            else {
                res.redirect('/')
            }
        })
    })
    // if (req.session.login) {
    //     res.render("form_AddUser.ejs", { showname: showname })
    // }
    // else {
    //     res.redirect('/')
    // }
})

router.post("/insert", (req, res) => {
    const username = req.body.UserName;
    User.findOne({ UserName: username }).exec((err, doc) => {
        if (!doc) {
            let data = new User({
                FacultyID: req.body.faculty_id,
                BranchID: req.body.branch_id,
                Prefix: req.body.Prefix,
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                UserName: req.body.UserName,
                Email: req.body.Email,
                PhoneNumber: req.body.PhoneNumber,
                Password: req.body.Password,
                TypeUser: req.body.TypeUser
            })
            User.saveUser(data, (err) => {
                if (err) console.log(err)
                res.redirect("/user")
            })
        }
        else {
            res.redirect("/form_AddUser")
        }
    })
})

module.exports = router