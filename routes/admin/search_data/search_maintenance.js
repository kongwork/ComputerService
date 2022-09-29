const express = require("express")
const router = express.Router()
const Mantenance = require('../../../models/maintenance')
const Room = require("../../../models/room")
const Device = require("../../../models/device")

router.post("/search-mtn", (req, res) => {
    const showname = req.session.username
    let query = { DeviceID: { $regex: '^' + req.body.search, $options: 'i' } }
    Device.find().exec((err, device) => {
        Room.find().exec((err, room) => {
            Mantenance.find().exec((err, count) => {
                Mantenance.find(query).exec((err, doc) => {
                    res.render("maintenance", {
                        type_user: req.session.typeUser,
                        count: count,
                        MTN: doc,
                        room: room,
                        device: device,
                        order: 1,
                        showname: showname
                    })
                })
            })
        })
    })
})

router.get("/search-mtn-0", (req, res) => {
    const showname = req.session.username
    let order = 1
    Device.find().exec((err, device) => {
        Room.find().exec((err, room) => {
            Mantenance.find().exec((err, count) => {
                Mantenance.find({ MTN_Status: '0', DeviceName: { $regex: '^' + '', $options: 'i' }, DeviceID: { $regex: '^' + '', $options: 'i' }}).exec((err, doc) => {
                    res.render("maintenance", {
                        type_user: req.session.typeUser,
                        count: count,
                        MTN: doc,
                        room: room,
                        device: device,
                        order: order,
                        showname: showname
                    })
                })
            })
        })
    })
})

router.get("/search-mtn-1", (req, res) => {
    const showname = req.session.username
    let order = 1
    Device.find().exec((err, device) => {
        Room.find().exec((err, room) => {
            Mantenance.find().exec((err, count) => {
                Mantenance.find({ MTN_Status: '1', DeviceName: { $regex: '^' + '', $options: 'i' }, DeviceID: { $regex: '^' + '', $options: 'i' }}).exec((err, doc) => {
                    res.render("maintenance", {
                        type_user: req.session.typeUser,
                        count: count,
                        MTN: doc,
                        room: room,
                        device: device,
                        order: order,
                        showname: showname
                    })
                })
            })
        })
    })
})

router.get("/search-mtn-2", (req, res) => {
    const showname = req.session.username
    let order = 1
    Device.find().exec((err, device) => {
        Room.find().exec((err, room) => {
            Mantenance.find().exec((err, count) => {
                Mantenance.find({ MTN_Status: '2', DeviceName: { $regex: '^' + '', $options: 'i' }, DeviceID: { $regex: '^' + '', $options: 'i' }}).exec((err, doc) => {
                    res.render("maintenance", {
                        type_user: req.session.typeUser,
                        count: count,
                        MTN: doc,
                        room: room,
                        device: device,
                        order: order,
                        showname: showname
                    })
                })
            })
        })
    })
})

router.get("/search-mtn-3", (req, res) => {
    const showname = req.session.username
    let order = 1
    Device.find().exec((err, device) => {
        Room.find().exec((err, room) => {
            Mantenance.find().exec((err, count) => {
                Mantenance.find({ MTN_Status: '3', DeviceName: { $regex: '^' + '', $options: 'i' }, DeviceID: { $regex: '^' + '', $options: 'i' }}).exec((err, doc) => {
                    res.render("maintenance", {
                        type_user: req.session.typeUser,
                        count: count,
                        MTN: doc,
                        room: room,
                        device: device,
                        order: order,
                        showname: showname
                    })
                })
            })
        })
    })
})

module.exports = router