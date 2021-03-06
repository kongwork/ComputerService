const express = require("express")
const router = express.Router()
const Device = require("../models/device")
const Category = require("../models/category")
const Maintenance = require("../models/maintenance")

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

const upload_img = multer({ storage: storage_img }).array("fileimg",3);


router.post("/inform/:id", (req, res) => {
    const showname = req.session.username
    if (req.session.login) {
        Device.findOne({ _id: req.params.id }).exec((err, doc_d) => {
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
        })
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
                MTN_Room: req.body.room,
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