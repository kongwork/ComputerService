const express = require("express")
const router = express.Router()
const Order = require("../../../models/order")
const Stock = require("../../../models/product")
const User = require("../../../models/user")

router.get("/page-allow-withdraw", (req, res) => {
    if (req.session.login && req.session.typeUser == 'Admin') {
        User.find().exec((err, user) => {
            Stock.find().exec((err, stock) => {
                Order.find({ status: '1'}).exec((err, order) => {
                    if (req.cookies.order_fail) {
                        res.render("allow_withdraw", {
                            type_user: req.session.typeUser,
                            withdraw_fail: true,
                            user: user,
                            stock: stock,
                            orders: order,
                            order: 1,
                            showname: req.session.username,
                            today: new Date()
                        })
                    }
                    else {
                        res.render("allow_withdraw", {
                            type_user: req.session.typeUser,
                            withdraw_fail: false,
                            user: user,
                            stock: stock,
                            orders: order,
                            order: 1,
                            showname: req.session.username,
                            today: new Date()
                        })
                    }
                })
            })
        })
    }
    else {
        res.redirect('/')
    }
})

module.exports = router