const express = require("express")
const router = express.Router()
const Branch = require("../../../models/branches")

router.post("/InsertBranch", (req, res) => {
    Branch.findOne({ Branch: req.body.Branch }).exec((err, doc) => {
        if (!doc) {
            let data = new Branch({
                FacultyID: req.body.faculty_id,
                Branch: req.body.branch
            })
            Branch.saveBranch(data, (err) => {
                if (err) console.log(err)
            })
            res.redirect(`/branch/${req.body.faculty_id}`)
        }
    })
})

module.exports = router