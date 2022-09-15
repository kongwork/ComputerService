const express = require("express")
const router = express.Router()
const Room = require("../../../models/room")

// แก้ไขคณะ
router.post("/edit-room", (req, res) => {
    let data = {
        r_faculty_id: req.body.faculty_id,
        r_branch_id: req.body.branch_id,
        r_name: req.body.name,
        r_capacity: req.body.capacity
    }
    // อัพเดตข้อมูล
    Room.findByIdAndUpdate( req.body.id_room, data, { useFindAndModify: false } ).exec(err => {
        res.redirect("/room")
    })
})

module.exports = router