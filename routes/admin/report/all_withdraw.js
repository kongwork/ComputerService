const express = require("express")
const router = express.Router()
const Order = require("../../../models/order")
const User = require("../../../models/user")
const Product = require("../../../models/product")
var pdf = require('html-pdf');
var fs = require('fs');
var options = { format: 'A4' };

router.post("/report-all-history-withdraw", (req, res) => {
    let date = new Date().toLocaleString('th-TH');
    let start_date = req.body.start_date
    let end_date = req.body.end_date

    function setdate() {
        let setday = new Date(end_date)
        setday.setDate(setday.getDate() + 1);
        let set_end_date = JSON.stringify(new Date(setday)).substring(1, 11)
        return set_end_date
    }
    User.find().exec((err, user) => {
        Product.find().exec((err, product) => {
            Order.find({date_withdraw: { $gte: start_date, $lte: setdate() }}).exec((err, order) => {
                res.render('report_all_withdraw', {
                    start_date: start_date,
                    end_date: end_date,
                    data: order,
                    order: 1,
                    date: date,
                    user: user,
                    product: product
                }, function (err, html) {
                    pdf.create(html, options).toFile('./public/uploads/all_withdraw.pdf', function (err, result) {
                        if (err) {
                            return console.log(err);
                        }
                        else {
                            console.log(res);
                            var datafile = fs.readFileSync('./public/uploads/all_withdraw.pdf');
                            res.header('content-type', 'application/pdf');
                            res.send(datafile);
                        }
                    })
                })
            })
        })
    })
})

module.exports = router