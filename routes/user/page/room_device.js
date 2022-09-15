const express = require("express")
const router = express.Router()
const Device = require("../../../models/device")
const Room = require("../../../models/room")

router.get("/user-page-room/device/:id", (req, res) => {
    const showname = req.session.username
    if (req.session.login && req.session.typeUser === 'User') {
        Room.findOne({ _id:req.params.id }).exec((err, room) => {
            Device.find({ RoomID: room._id }).exec((err, device) => {
                res.render("user_page_room_device", {
                    room: room,
                    devices: device,
                    order: 1,
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