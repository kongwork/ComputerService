const express = require("express")
const Faculty = require("../../models/faculties")
const Branch = require("../../models/branches")
const router = express.Router()

router.get("/faculty", (req, res) => {
    const showname = req.session.username
    if (req.session.login && req.session.typeUser == 'Admin') {
        let order = 1
        Faculty.find().exec((err, faculty) => {
            Branch.find().exec((err, branch) => {
                res.render("faculty", {
                    faculty: faculty,
                    branch: branch,
                    order: order,
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