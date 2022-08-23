const express = require("express")
const router = express.Router()
const Faculty = require("../../../models/faculties")

// แก้ไขคณะ
router.post("/EditFaculty", (req, res) => {
    let data = {
        Faculty: req.body.faculty
    }
    // อัพเดตข้อมูล
    Faculty.findByIdAndUpdate( req.body.id_faculty, data, { useFindAndModify: false } ).exec(err => {
        res.redirect("/faculty")
    })
})

module.exports = router