const express = require("express")
const router = express.Router()
const Category = require("../../../models/category")
const Device = require("../../../models/device")
const Branch = require("../../../models/branches")
const Faculty = require("../../../models/faculties")
const Room = require("../../../models/room")

router.get("/form_AddDevice", (req, res) => {
    const showname = req.session.username
    if (req.session.login && req.session.typeUser === 'Admin') {
        Room.find().exec((err, room) => {
            Faculty.find().exec((err, faculty) => {
                Branch.find().exec((err, branch) => {
                    Category.find().exec((err, doc) => {
                        if (req.cookies.capacity_fail) {
                            res.render("form_AddDevice", {
                                capacity_fail: true,
                                room: room,
                                faculty: faculty,
                                branch: branch,
                                categorys: doc,
                                showname: showname,
                                date: new Date()
                            })
                        }
                        else {
                            res.render("form_AddDevice", {
                                capacity_fail: false,
                                room: room,
                                faculty: faculty,
                                branch: branch,
                                categorys: doc,
                                showname: showname,
                                date: new Date()
                            })
                        }
                    })
                })
            })
        })
    }
    else {
        res.redirect('/')
    }
})

router.post("/insertDevice", (req, res) => {
    Device.countDocuments({ RoomID: req.body.room_id }).exec((err, count_device) => {
        Room.findOne({ _id: req.body.room_id }).exec((err, count_room) => {
            if ( count_device == count_room.r_capacity) {
                res.cookie('capacity_fail',true,{maxAge:2000})
                res.redirect("/form_AddDevice")
            }
            else {
                Device.findOne({ DeviceCode: req.body.device_code }).exec((err, doc) => {
                    Category.findOne({ _id: req.body.category_id }).exec((err, doc_c) => {
                        if (!doc) {
                            let data = new Device({
                                RoomID: req.body.room_id,
                                FacultyID: req.body.faculty_id,
                                BranchID: req.body.branch_id,
                                CategoryID: req.body.category_id,
                                DeviceName: req.body.device_name,
                                CategoryName: doc_c.CategoryName,
                                DeviceCode: req.body.device_code,
                                Price: req.body.price,
                                Date: req.body.date,
                                DeviceStatus: req.body.status
                            })
                            Device.saveDevice(data, (err) => {
                                if (err) {
                                    res.redirect("/form_AddDevice")
                                    console.log(err)
                                }
                                else {
                                res.redirect("/device")
                                }
                            })
                            console.log(data)
                        }
                        else {
                            res.redirect("/form_AddDevice")
                        }
                    })
                })
            }
        })
    })
    /*Device.findOne({ DeviceCode: req.body.device_code }).exec((err, doc) => {
        Category.findOne({ _id: req.body.category_id }).exec((err, doc_c) => {
            if (!doc) {
                let data = new Device({
                    RoomID: req.body.room_id,
                    FacultyID: req.body.faculty_id,
                    BranchID: req.body.branch_id,
                    CategoryID: req.body.category_id,
                    DeviceName: req.body.device_name,
                    CategoryName: doc_c.CategoryName,
                    DeviceCode: req.body.device_code,
                    Price: req.body.price,
                    Date: req.body.date,
                    DeviceStatus: req.body.status
                })
                Device.saveDevice(data, (err) => {
                    if (err) {
                        res.redirect("/form_AddDevice")
                        console.log(err)
                    }
                    else {
                    res.redirect("/device")
                    }
                })
                console.log(data)
            }
            else {
                res.redirect("/form_AddDevice")
            }
        })
    })*/
})

module.exports = router