const express = require("express")
const router = express.Router()
const Room = require("../../../models/room")
const Faculty = require("../../../models/faculties")
const Branch = require("../../../models/branches")
const Device = require("../../../models/device")

router.post("/search-room", (req, res) => {
    let query = { r_name: { $regex: '^' + req.body.search, $options: 'i' } }
    input_search_null = req.body.search
    if (input_search_null === "") {
        res.redirect("/room")
    }
    else {
        Device.find().exec((err, device) => {
            Faculty.find().exec((err, faculty) => {
                Branch.find().exec((err, branch) => {
                    Room.find(query).sort({r_name: 1}).exec((err, room) => {
                        res.render("room",{
                            showname: req.session.username,
                            order: 1,
                            device: device,
                            faculty:faculty,
                            branch:branch,
                            room:room
                        })
                    })
                })
            })
        })
    }
})

module.exports = router