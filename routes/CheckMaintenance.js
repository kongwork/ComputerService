const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer")
const Maintenance = require("../models/maintenance")
const Device = require("../models/device")
const User = require("../models/user")


router.post("/CheckMaintenance/:id", (req, res) => {
    const showname = req.session.username
    if (req.session.login) {
        Maintenance.findOne({ _id: req.params.id }).exec((err, doc) => {
            res.render("CheckMaintenance", { MTN: doc, showname: showname })
            console.log(typeof doc.MTN_Img[0],'-------------------------')
        })
    }
    else {
        res.redirect('/')
    }
})

// Confirm Check Device
router.post("/ConfirmMaintenance/:UserID", (req, res) => {
    Maintenance.findOne({ _id: req.body.maintenance_id }).exec((err, docMTN) => {
        User.findById(req.params.UserID).exec((err, docUser) => {
            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "kongwork26729@gmail.com",
                    pass: "iwqbdnidrbnojgml",
                },
            });

            var mailOptions = {
                from: "kongwork26729@gmail.com",
                to: docUser.Email,
                subject: "Sending Email using Node.js",
                html: 
                `
                    <div>
                        <h1>เรียน ${docUser.Prefix} ${docUser.FirstName} ${docUser.LastName}</h1>
                        <h1><b>Computer Science Repair - รหัสอุปกรณ์ ${docMTN.DeviceID} ได้รับการยืนยันการแจ้งซ่อมแล้ว</b></h1>
                        <br>
                        <h2>รายละเอียดการแจ้งซ่อม</h2>
                        <h3>ชื่อ - นามสกุล</h3>
                        <p>${docUser.Prefix} ${docUser.FirstName} ${docUser.LastName}</p>
                        <h3>หมายเลขอุปกรณ์</h3><h3>ชื่ออุปกรณ์</h3>
                    </div>        
                `,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });

            let mtn_data = {
                MTN_Status: '2'
            }
            let dv_data = {
                DeviceStatus: '1'
            }
            // อัพเดตข้อมูล Device
            Maintenance.findByIdAndUpdate( req.body.maintenance_id, mtn_data, { useFindAndModify: false } ).exec(err => {
                Device.findOneAndUpdate({DeviceCode: docMTN.DeviceID}, dv_data, { useFindAndModify: false } ).exec(err => {
                    res.redirect("/maintenance")
                })
            })

        })
    })
})

module.exports = router