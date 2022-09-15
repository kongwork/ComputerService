const express = require("express")
const router = express.Router()
const Room = require("../../../models/room")
const Faculty = require("../../../models/faculties")
const Branch = require("../../../models/branches")
const Device = require("../../../models/device")

router.get("/user-page-room", (req, res) => {
    if (req.session.login && req.session.typeUser == 'User') {
        Device.find().exec((err, device) => {
            Faculty.find().exec((err, faculty) => {
                Branch.find().exec((err, branch) => {
                    Room.find().sort({r_name: 1}).exec((err, room) => {
                        res.render("user_page_room",{
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
    else {
        res.redirect('/')
    }
})

module.exports = router