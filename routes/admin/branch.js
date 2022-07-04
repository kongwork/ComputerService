const express = require("express")
const Faculty = require("../../models/faculties")
const Branch = require("../../models/branches")
const router = express.Router()

router.post("/branch", (req, res) => {
    const showname = req.session.username
    if (req.session.login && req.session.typeUser == 'Admin') {
        let order = 1
        Faculty.find().exec((err, faculty) => {
            Branch.find({ FacultyID: req.body.FacultyID, Branch: { $regex: '^' + '', $options: 'i' }, DeviceID: { $regex: '^' + '', $options: 'i' }}).exec((err, branch) => {
                res.render("branch", {
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