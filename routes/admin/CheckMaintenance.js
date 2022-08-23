const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer")
const Maintenance = require("../../models/maintenance")
const Device = require("../../models/device")
const User = require("../../models/user")
const Branch = require("../../models/branches")
const Faculty = require("../../models/faculties")


router.post("/CheckMaintenance/:id", (req, res) => {
    const showname = req.session.username
    if (req.session.login) {
        Maintenance.findOne({ _id: req.params.id }).exec((err, maintenance) => {
            Device.findOne({ DeviceCode: maintenance.DeviceID }).exec((err, device) => {
                Branch.findOne({ _id: device.BranchID }).exec((err, branch) => {
                    Faculty.findOne({ _id: device.FacultyID }).exec((err, faculty) => {
                        User.findOne({ _id: maintenance.UserID }).exec((err, user_detail) => {
                            Branch.findOne({ _id: user_detail.BranchID }).exec((err, user_detail_branch) => {
                                Faculty.findOne({ _id: user_detail.FacultyID }).exec((err, user_detail_faculty) => {
                                    res.render("CheckMaintenance", {
                                        user_detail: user_detail,
                                        user_detail_faculty: user_detail_faculty,
                                        user_detail_branch: user_detail_branch,
                                        branch: branch,
                                        faculty: faculty,
                                        device: device,
                                        MTN: maintenance,
                                        showname: showname
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

// Confirm Check Device
router.post("/ConfirmMaintenance/:UserID", (req, res) => {
    Maintenance.findOne({ _id: req.body.maintenance_id }).exec((err, docMTN) => {
        User.findById(req.params.UserID).exec((err, docUser) => {
            Device.findOne({ DeviceCode: docMTN.DeviceID }).exec((err, device) => {
                Branch.findOne({ _id: device.BranchID }).exec((err, branch) => {
                    Faculty.findOne({ _id: device.FacultyID }).exec((err, faculty) => {
                        if (docMTN.MTN_Status == '1') {
                            var transporter = nodemailer.createTransport({
                                service: "gmail",
                                auth: {
                                    user: "kongwork26729@gmail.com",
                                    pass: "xfggfyjrifvycgnq",
                                },
                            });

                            var mailOptions = {
                                from: "kongwork26729@gmail.com",
                                to: docUser.Email,
                                subject: "Sending Email using Node.js",
                                html: 
                                `
                                    <div>
                                        <h2>เรียน ${docUser.Prefix} ${docUser.FirstName} ${docUser.LastName}</h2>
                                        <h2><b>Computer Science Repair - อุปกรณ์ได้รับการ<span style="color:#33cc33;">ยืนยัน</span>การแจ้งซ่อมแล้ว</b></h2>
                                        <br>
                                        <h3>รายละเอียดอุปกรณ์</h3>
                                        <div style="padding: 0 33px;">
                                            <div>
                                                <p style="font-size: 15px;">
                                                    หมายเลขอุปกรณ์ :  ${docMTN.DeviceID}
                                                </p>
                                            </div>
                                            <div>
                                                <p style="font-size: 15px;">
                                                    ชื่ออุปกรณ์ : ${device.DeviceName}
                                                </p>
                                            </div>
                                            <div>
                                                <p style="font-size: 15px;">
                                                    ห้อง : ${device.Room}
                                                </p>
                                            </div>
                                            <div>
                                                <p style="font-size: 15px;">
                                                    คณะ : ${faculty.Faculty}
                                                </p>
                                            </div>
                                            <div>
                                                <p style="font-size: 15px;">
                                                    สาขา : ${branch.Branch}
                                                </p>
                                            </div>
                                        </div>
                                        <br>
                                        <h3>รายละเอียดอาการเสีย</h3>
                                        <div style="padding: 0 33px;">
                                            <p style="font-size: 15px;">
                                                ${docMTN.MTN_Detail}
                                            </p>
                                        </div>
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
                        }
                        else {
                            var transporter = nodemailer.createTransport({
                                service: "gmail",
                                auth: {
                                    user: "kongwork26729@gmail.com",
                                    pass: "xfggfyjrifvycgnq",
                                },
                            });

                            var mailOptions = {
                                from: "kongwork26729@gmail.com",
                                to: docUser.Email,
                                subject: "Sending Email using Node.js",
                                html: 
                                `
                                    <div>
                                        <h2>เรียน ${docUser.Prefix} ${docUser.FirstName} ${docUser.LastName}</h2>
                                        <h2><b>Computer Science Repair - อุปกรณ์ได้รับการซ่อมแซม<span style="color:#33cc33;">สำเร็จ</span>แล้ว</b></h2>
                                        <br>
                                        <h3>รายละเอียดอุปกรณ์</h3>
                                        <div style="padding: 0 33px;">
                                            <div>
                                                <p style="font-size: 15px;">
                                                    หมายเลขอุปกรณ์ :  ${docMTN.DeviceID}
                                                </p>
                                            </div>
                                            <div>
                                                <p style="font-size: 15px;">
                                                    ชื่ออุปกรณ์ : ${device.DeviceName}
                                                </p>
                                            </div>
                                            <div>
                                                <p style="font-size: 15px;">
                                                    ห้อง : ${device.Room}
                                                </p>
                                            </div>
                                            <div>
                                                <p style="font-size: 15px;">
                                                    คณะ : ${faculty.Faculty}
                                                </p>
                                            </div>
                                            <div>
                                                <p style="font-size: 15px;">
                                                    สาขา : ${branch.Branch}
                                                </p>
                                            </div>
                                        </div>
                                        <br>
                                        <h3>รายละเอียดอาการเสีย</h3>
                                        <div style="padding: 0 33px;">
                                            <p style="font-size: 15px;">
                                                ${docMTN.MTN_Detail}
                                            </p>
                                        </div>
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
                        }
                        /*var transporter = nodemailer.createTransport({
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
                        });*/

                        if (docMTN.MTN_Status == '1') {
                            let mtn_data = {
                                MTN_Status: '2'
                            }
                            let dv_data = {
                                DeviceStatus: '1'
                            }
                            Maintenance.findByIdAndUpdate( req.body.maintenance_id, mtn_data, { useFindAndModify: false } ).exec(err => {
                                Device.findOneAndUpdate({DeviceCode: docMTN.DeviceID}, dv_data, { useFindAndModify: false } ).exec(err => {
                                    res.redirect("/maintenance")
                                })
                            })
                        }
                        else {
                            let mtn_data = {
                                MTN_Status: '3'
                            }
                            let dv_data = {
                                DeviceStatus: '0'
                            }
                            Maintenance.findByIdAndUpdate( req.body.maintenance_id, mtn_data, { useFindAndModify: false } ).exec(err => {
                                Device.findOneAndUpdate({DeviceCode: docMTN.DeviceID}, dv_data, { useFindAndModify: false } ).exec(err => {
                                    res.redirect("/maintenance")
                                })
                            })
                        }
                    })
                })
            })
        })   
    })
})

module.exports = router