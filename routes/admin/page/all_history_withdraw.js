const express = require("express")
const router = express.Router()
const Order = require("../../../models/order")
const Stock = require("../../../models/product")
const User = require("../../../models/user")

router.get("/all-history-withdraw", (req, res) => {
    if (req.session.login && req.session.typeUser == 'Admin') {
        User.find().exec((err, user) => {
            Stock.find().exec((err, stock) => {
                Order.find({date_withdraw: { $ne: null }}).sort({date_withdraw : -1}).exec((err, order) => {
                    res.render("all_history_withdraw", {
                        user: user,
                        stock: stock,
                        orders: order,
                        order: 1,
                        showname: req.session.username,
                        today: new Date()
                    })
                })
            })
        })
    }
    else {
        res.redirect('/')
    }
})

module.exports = router