const express = require("express")
const router = express.Router()
const Branch = require("../../../models/branches")

// แก้ไขคณะ
router.post("/EditBranch", (req, res) => {
    let data = {
        Branch: req.body.branch
    }
    // อัพเดตข้อมูล
    Branch.findByIdAndUpdate( req.body.id_branch, data, { useFindAndModify: false } ).exec(err => {
        res.redirect(`/branch/${req.body.faculty_id}`)
    })
})

module.exports = router