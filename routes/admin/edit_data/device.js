const express = require("express")
const router = express.Router()
const Device = require("../../../models/device")
const Category = require("../../../models/category")
const Faculty = require("../../../models/faculties")
const Branch = require("../../../models/branches")
const Room = require("../../../models/room")

router.post("/editDevice", (req, res) => {
    const edit_device = req.body.edit_device
    const showname = req.session.username
    if (req.session.login) {
        Room.find().exec((err, room) => {
            Branch.find().exec((err, branch) => {
                Faculty.find().exec((err, faculty) => {
                    Device.findOne({ _id: edit_device }).exec((err, device) => {
                        Room.findOne({ _id: device.RoomID }).exec((err, find_room) => {
                            Faculty.findOne({ _id: device.FacultyID }).exec((err, find_faculty) => {
                                Branch.findOne({ _id: device.BranchID }).exec((err, find_branch) => {
                                    Category.find().exec((err, doc_c) => {
                                        Category.findOne({ _id: device.CategoryID }).exec((err, cate) => {
                                            res.render("edit_device", {
                                                find_room: find_room,
                                                find_faculty: find_faculty,
                                                find_branch: find_branch,
                                                room: room,
                                                branch: branch,
                                                faculty: faculty,
                                                cate: cate,
                                                devices: device,
                                                categorys: doc_c,
                                                showname: showname
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
        
    }
    else {
        res.redirect('/')
    }
})

// Update Data Device
router.post("/updateDevice", (req, res) => {
    // ข้อมูลใหม่ที่ส่งมาจาก form edit
    Category.findOne({ _id: req.body.category_id }).exec((err, doc_c) => {
        let data = {
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
        }
        // อัพเดตข้อมูล Device
        Device.findByIdAndUpdate( req.body.device_id, data, { useFindAndModify: false } ).exec(err => {
            console.log(req.body)
            res.redirect("/device")
        })
    })
    
})

module.exports = router;