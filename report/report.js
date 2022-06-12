const express = require("express")
const router = express.Router()
const User = require("../models/user")
var pdf = require('html-pdf');
var fs = require('fs');
var options = { format: 'A4' };

router.get('/h', (req, res) => {
    res.render('home')
});

router.post('/', (req, res) => {
    User.find().exec((err, doc) => {
        res.render('demopdf', { data: doc }, function (err, html) {
            pdf.create(html, options).toFile('./public/uploads/demopdf.pdf', function (err, result) {
                if (err) {
                    return console.log(err);
                }
                else {
                    console.log(res);
                    var datafile = fs.readFileSync('./public/uploads/demopdf.pdf');
                    res.header('content-type', 'application/pdf');
                    res.send(datafile);
                }
            });
        })
    })
})
// router.get('/report', (req, res) => {
//     User.find().exec((err, doc) => {
//         res.render('demopdf', { data: doc }, function (err, html) {
//             pdf.create(html, options).toFile('./report/report.pdf', function (err, result) {
//                 if (err) {
//                     return console.log(err);
//                 }
//                 else {
//                     console.log(res);
//                     var datafile = fs.readFileSync('./report/report.pdf');
//                     res.header('content-type', 'application/pdf');
//                     res.send(datafile);
//                 }
//             });
//         })
//     })
//     // res.render('demopdf', { data: req.body.article }, function (err, html) {
//     //     pdf.create(html, options).toFile('./report/report.pdf', function (err, result) {
//     //         if (err) {
//     //             return console.log(err);
//     //         }
//     //         else {
//     //             console.log(res);
//     //             var datafile = fs.readFileSync('./report/report.pdf');
//     //             res.header('content-type', 'application/pdf');
//     //             res.send(datafile);
//     //         }
//     //     });
//     // })
// })

module.exports = router