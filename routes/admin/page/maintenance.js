const express = require("express")
const router = express.Router()
const Room = require("../../../models/room")
const Device = require("../../../models/device")
const Maintenance = require("../../../models/maintenance")

router.get("/maintenance", (req, res) => {
    const showname = req.session.username
    if (req.session.login && (req.session.typeUser == 'Admin' || req.session.typeUser == 'Technician')) {
        Device.find().exec((err, device) => {
            Room.find().exec((err, room) => {
                Maintenance.find().exec((err, doc) => {
                    res.render("maintenance", {
                        type_user: req.session.typeUser,
                        order: order = 1,
                        showname: showname,
                        count: doc,
                        MTN: doc,
                        room: room,
                        device: device
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