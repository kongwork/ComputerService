const express = require("express")
const router = express.Router()
const Device = require("../models/device")
const Category = require("../models/category")
const Maintenance = require("../models/maintenance")
const Room = require("../models/room")
const Faculty = require("../models/faculties")
const Branch = require("../models/branches")

// อัพโหลดไฟล์
const multer = require("multer")
const storage_img = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploadsIMG"); //ตำแหน่งเก็บไฟล์
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ".jpg"); //เปลี่ยนชื่อไฟล์ ้ป้องกันชื่อไฟล์ซ้ำกัน
    },
});

const upload_img = multer({ storage: storage_img }).array("fileimg");


router.post("/inform/:id", (req, res) => {
    const showname = req.session.username
    if (req.session.login) {
        Room.find().exec((err, room) => {
            Branch.find().exec((err, branch) => {
                Faculty.find().exec((err, faculty) => {
                    Device.findOne({ _id: req.params.id }).exec((err, device) => {
                        Room.findOne({ _id: device.RoomID }).exec((err, find_room) => {
                            Faculty.findOne({ _id: device.FacultyID }).exec((err, find_faculty) => {
                                Branch.findOne({ _id: device.BranchID }).exec((err, find_branch) => {
                                    Category.find().exec((err, doc_c) => {
                                        Category.findOne({ _id: device.CategoryID }).exec((err, cate) => {
                                            Maintenance.findOne({ DeviceID: device.DeviceCode, MTN_Status: {$in: ['1', '2']} }).exec((err, mtn) => {
                                                res.render("inform", {
                                                    find_room: find_room,
                                                    find_faculty: find_faculty,
                                                    find_branch: find_branch,
                                                    room: room,
                                                    branch: branch,
                                                    faculty: faculty,
                                                    cate: cate,
                                                    devices: device,
                                                    categorys: doc_c,
                                                    showname: showname,
                                                    checkmtn: mtn
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
        })
        // Device.findOne({ _id: req.params.id }).exec((err, doc_d) => {
        //     Maintenance.findOne({ DeviceID: doc_d.DeviceCode, MTN_Status: {$in: ['1', '2']} }).exec((err, doc_m) => {
        //         Category.find().exec((err, doc_c) => {
        //             Category.findOne({ _id: doc_d.CategoryID }).exec((err, cate) => {
        //                 res.render("inform", {
        //                     cate: cate,
        //                     devices: doc_d,
        //                     categorys: doc_c,
        //                     checkmtn: doc_m,
        //                     showname: showname
        //                 })
        //             })
        //         })
        //     })
        // })
        /*Device.findOne({ _id: req.params.id }).exec((err, doc_d) => {
            Maintenance.findOne({ DeviceID: doc_d.DeviceCode }).exec((err, doc_m) => {
                Category.find().exec((err, doc_c) => {
                    Category.findOne({ _id: doc_d.CategoryID }).exec((err, cate) => {
                        res.render("inform", {
                            cate: cate,
                            devices: doc_d,
                            categorys: doc_c,
                            checkmtn: doc_m,
                            showname: showname
                        })
                        console.log(doc_m)
                    })
                })
            })
        })*/
    }
    else {
        res.redirect('/')
    }
})

router.post("/updateInform", (req, res) => {
    upload_img(req, res, function (err) {
        console.log(req.files)
        if (err) {
            console.log(err)
        }
        else {
            let data = new Maintenance({
                UserID: req.session.userid,
                UserInform: req.session.username,
                UserFirstName: req.session.fname,
                UserLastName: req.session.lname,
                PhoneNumber: req.session.phone,
                DeviceID: req.body.device_code,
                DeviceName: req.body.device_name,
                MTN_Status: '1',
                MTN_Date: Date.now(),
                MTN_CheckDate: '',
                MTN_Detail: req.body.MTN_Detail,
                MTN_Img:[]
            });
            req.files.map(el => data.MTN_Img.push(el.filename))
            Maintenance.saveMaintenance(data, (err) => {
                if (err) console.log(err)
                res.redirect("/user_device")
            })
        }
    })
})

module.exports = router;