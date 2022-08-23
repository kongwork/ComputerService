const express = require("express")
const Faculty = require("../../models/faculties")
const Branch = require("../../models/branches")
const router = express.Router()

router.get("/branch/:id", (req, res) => {
    const showname = req.session.username
    if (req.session.login && req.session.typeUser == 'Admin') {
        let order = 1
        Faculty.findOne({ _id: req.params.id}).exec((err, faculty) => {
            Branch.find({ FacultyID: req.params.id, Branch: { $regex: '^' + '', $options: 'i' }, DeviceID: { $regex: '^' + '', $options: 'i' }}).exec((err, branch) => {
                res.render("branch", {
                    faculty_id: req.params.id,
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