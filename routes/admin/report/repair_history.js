const express = require("express")
const router = express.Router()
const Maintenance = require("../../../models/maintenance")
const Device = require("../../../models/device")
const Room = require("../../../models/room")
const Branch = require("../../../models/branches")
const Faculty = require("../../../models/faculties")
var pdf = require('html-pdf');
var fs = require('fs');
var options = { format: 'A4' };

router.post("/report-history-repair", (req, res) => {
    let date = new Date().toLocaleString('th-TH');
    Maintenance.find({ DeviceID: req.body.id, MTN_Status:'3' }).exec((err, maintenance) => {
        Device.findOne({ DeviceCode: req.body.id }).exec((err, device) => {
            Branch.findOne({ _id: device.BranchID }).exec((err, branch) => {
                Faculty.findOne({ _id: device.FacultyID }).exec((err, faculty) => {
                    Room.findOne({ _id: device.RoomID }).exec((err, room) => {
                        // console.log(device);
                        // console.log(room);
                        // console.log(branch);
                        // console.log(faculty);
                        res.render('report_history_repair', {
                            data: maintenance,
                            device: device,
                            branch: branch,
                            faculty: faculty,
                            room: room,
                            order: 1,
                            date: date 
                        }, function (err, html) {
                            pdf.create(html, options).toFile('./public/uploads/repair_history.pdf', function (err, result) {
                                if (err) {
                                    return console.log(err);
                                }
                                else {
                                    console.log(res);
                                    var datafile = fs.readFileSync('./public/uploads/repair_history.pdf');
                                    res.header('content-type', 'application/pdf');
                                    res.send(datafile);
                                }
                            })
                        })
                    })
                })
            })
        })
    })
})

module.exports = router


// router.post("/report-history-repair", (req, res) => {
//     let date = new Date().toLocaleString('th-TH');
//     Maintenance.find({DeviceID: req.body.id, MTN_Status:'3'}).exec((err, maintenance) => {
//         Device.findOne({DeviceCode: req.body.id}).exec((err, device) => {
//             Branch.findOne({_id: device.BranchID}).exec((err, branch) => {
//                 Faculty.findOne({_id: device.FacultyID}).exec((err, faculty) => {
//                     Room.findOne({r_branch_id: device.RoomID}).exec((err, room) => {
//                         res.render('report_history_repair', {
//                             data: maintenance,
//                             // device: device,
//                             // branch: branch,
//                             // faculty: faculty,
//                             // room: room,
//                             order: 1,
//                             date: date 
//                         }, function (err, html) {
//                             pdf.create(html, options).toFile('./public/uploads/repair_history.pdf', function (err, result) {
//                                 if (err) {
//                                     return console.log(err);
//                                 }
//                                 else {
//                                     //console.log(res);
//                                     var datafile = fs.readFileSync('./public/uploads/repair_history.pdf');
//                                     res.header('content-type', 'application/pdf');
//                                     res.send(datafile);
//                                 }
//                             })
//                         })
//                     })
//                 })
//             })
//         })
//     })
// })

// router.get("/repair-history/:id", (req, res) => {
//     Maintenance.find({DeviceID: req.params.id, MTN_Status:'3'}).exec((err, maintenance) => {
//         res.render("repair_history",{
//             showname: req.session.username,
//             order: 1,
//             history: maintenance
//         })
//         console.log(maintenance)
//     })
// })
