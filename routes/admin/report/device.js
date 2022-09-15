const express = require("express")
const router = express.Router()
const Maintenance = require("../../../models/maintenance")
const Device = require("../../../models/device")
var pdf = require('html-pdf');
var fs = require('fs');
var options = { format: 'A4' };

router.post("/report-device-date", (req, res) => {
    let date = new Date().toLocaleString('th-TH');
    let start_date = req.body.start_date
    let end_date = req.body.end_date

    function setdate() {
        let setday = new Date(end_date)
        setday.setDate(setday.getDate() + 1);
        let set_end_date = JSON.stringify(new Date(setday)).substring(1, 11)
        return set_end_date
    }

    if (req.body.report == 0) {
        Device.find({Date: { $gte: start_date, $lte: setdate() }}).exec((err, device) => {
            let total = 0
            device.forEach(element => {
                total = total + element.Price
            })
            res.render('report_pay_device', {
                start_date: start_date,
                end_date: end_date,
                data: device,
                order: 1,
                date: date,
                price: total
            }, function (err, html) {
                pdf.create(html, options).toFile('./public/uploads/pay_device.pdf', function (err, result) {
                    if (err) {
                        return console.log(err);
                    }
                    else {
                        console.log(res);
                        var datafile = fs.readFileSync('./public/uploads/pay_device.pdf');
                        res.header('content-type', 'application/pdf');
                        res.send(datafile);
                    }
                })
            })
        })
    }
    else {
        Device.find({DateDispose: { $gte: start_date, $lte: setdate() }}).exec((err, device) => {
            res.render('report_dispose_device', {
                start_date: start_date,
                end_date: end_date,
                data: device,
                order: 1,
                date: date 
            }, function (err, html) {
                pdf.create(html, options).toFile('./public/uploads/dispose_device.pdf', function (err, result) {
                    if (err) {
                        return console.log(err);
                    }
                    else {
                        console.log(res);
                        var datafile = fs.readFileSync('./public/uploads/dispose_device.pdf');
                        res.header('content-type', 'application/pdf');
                        res.send(datafile);
                    }
                })
            })
        })
    }
    // Device.find({DateDispose: { $gte: start_date, $lte: setdate() }}).exec((err, device) => {
    //     res.render('report_dispose_device', {
    //         data: device,
    //         order: 1,
    //         date: date 
    //     }, function (err, html) {
    //         pdf.create(html, options).toFile('./public/uploads/dispose_device.pdf', function (err, result) {
    //             if (err) {
    //                 return console.log(err);
    //             }
    //             else {
    //                 console.log(res);
    //                 var datafile = fs.readFileSync('./public/uploads/dispose_device.pdf');
    //                 res.header('content-type', 'application/pdf');
    //                 res.send(datafile);
    //             }
    //         })
    //     })
    // })
})

module.exports = router