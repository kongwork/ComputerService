const express = require("express")
const router = express.Router()
const Order = require("../../../models/order")
const Stock = require("../../../models/product")

router.get("/cart", (req, res) => {
    if (req.session.login && (req.session.typeUser == 'Admin' || req.session.typeUser == 'Technician')) {
        Stock.find().exec((err, stock) => {
            Order.find({ user_id: req.session.userid, date_withdraw: null }).exec((err, order) => {
                if (req.cookies.order_fail) {
                    res.render("cart", {
                        type_user: req.session.typeUser,
                        withdraw_fail: true,
                        stock: stock,
                        orders: order,
                        order: 1,
                        showname: req.session.username,
                        today: new Date()
                    })
                }
                else {
                    res.render("cart", {
                        type_user: req.session.typeUser,
                        withdraw_fail: false,
                        stock: stock,
                        orders: order,
                        order: 1,
                        showname: req.session.username,
                        today: new Date()
                    })
                }
            })
        })
    }
    else {
        res.redirect('/')
    }
})

module.exports = router