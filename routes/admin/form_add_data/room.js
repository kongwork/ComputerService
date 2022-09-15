const express = require("express")
const router = express.Router()
const Room = require("../../../models/room")

router.post("/add-room", (req, res) => {
        let data = new Room({
            r_faculty_id: req.body.faculty_id,
            r_branch_id: req.body.branch_id,
            r_name: req.body.name,
            r_capacity: req.body.capacity
        })
        Room.saveRoom(data, (err) => {
            if (err) console.log(err)
        })
        res.redirect('room')
        
})

module.exports = router