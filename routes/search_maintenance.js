const express = require("express")
const router = express.Router()
const Mantenance = require('../models/maintenance')

router.get("/search-mtn-0", (req, res) => {
    const showname = req.session.username
    let order = 1
    Mantenance.find().exec((err, count) => {
        Mantenance.find({ MTN_Status: '0', DeviceName: { $regex: '^' + '', $options: 'i' }, DeviceID: { $regex: '^' + '', $options: 'i' }}).exec((err, doc) => {
            res.render("search_maintenance", {
                count: count,
                MTN: doc,
                order: order,
                showname: showname
            })
        })
    })
})

router.get("/search-mtn-1", (req, res) => {
    const showname = req.session.username
    let order = 1
    Mantenance.find().exec((err, count) => {
        Mantenance.find({ MTN_Status: '1', DeviceName: { $regex: '^' + '', $options: 'i' }, DeviceID: { $regex: '^' + '', $options: 'i' }}).exec((err, doc) => {
            res.render("search_maintenance", {
                count: count,
                MTN: doc,
                order: order,
                showname: showname
            })
        })
    })
})

router.get("/search-mtn-2", (req, res) => {
    const showname = req.session.username
    let order = 1
    Mantenance.find().exec((err, count) => {
        Mantenance.find({ MTN_Status: '2', DeviceName: { $regex: '^' + '', $options: 'i' }, DeviceID: { $regex: '^' + '', $options: 'i' }}).exec((err, doc) => {
            res.render("search_maintenance", {
                count: count,
                MTN: doc,
                order: order,
                showname: showname
            })
        })
    })
})

router.get("/search-mtn-3", (req, res) => {
    const showname = req.session.username
    let order = 1
    Mantenance.find().exec((err, count) => {
        Mantenance.find({ MTN_Status: '3', DeviceName: { $regex: '^' + '', $options: 'i' }, DeviceID: { $regex: '^' + '', $options: 'i' }}).exec((err, doc) => {
            res.render("search_maintenance", {
                count: count,
                MTN: doc,
                order: order,
                showname: showname
            })
        })
    })
})

module.exports = router