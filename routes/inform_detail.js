const express = require("express")
const router = express.Router()
const Maintenance = require("../models/maintenance")
const User = require("../models/user")
const Device = require("../models/device")
const Room = require("../models/room")
const Faculty = require("../models/faculties")
const Branch = require("../models/branches")

router.post("/inform_detail/:id", (req, res) => {
    const showname = req.session.username
    // Maintenance.findOne({ _id: req.params.id }).exec((err, maintenance) => {
    //     User.findOne({ _id: maintenance.UserID }).exec((err, user) => {
    //         res.render('inform_detail', {
    //             showname: showname,
    //             mtn: maintenance,
    //             user: user
    //         })
    //         console.log(user)
    //     })
    // })
    Maintenance.findOne({ _id: req.params.id }).exec((err, maintenance) => {
        Device.findOne({ DeviceCode: maintenance.DeviceID }).exec((err, device) => {
            Room.findOne({ _id: device.RoomID }).exec((err, find_room) => {
                Branch.findOne({ _id: device.BranchID }).exec((err, branch) => {
                    Faculty.findOne({ _id: device.FacultyID }).exec((err, faculty) => {
                        User.findOne({ _id: maintenance.UserID }).exec((err, user_detail) => {
                            Branch.findOne({ _id: user_detail.BranchID }).exec((err, user_detail_branch) => {
                                Faculty.findOne({ _id: user_detail.FacultyID }).exec((err, user_detail_faculty) => {
                                    res.render("inform_detail", {
                                        user_detail: user_detail,
                                        user_detail_faculty: user_detail_faculty,
                                        user_detail_branch: user_detail_branch,
                                        branch: branch,
                                        faculty: faculty,
                                        device: device,
                                        mtn: maintenance,
                                        showname: showname,
                                        room: find_room
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})

module.exports = router