const express = require("express")
const router = express.Router()
const Order = require("../../../models/order")
const Stock = require("../../../models/product")

router.get("/my-history-withdraw", (req, res) => {
    if (req.session.login && (req.session.typeUser == 'Admin' || req.session.typeUser == 'Technician')) {
        Stock.find().exec((err, stock) => {
            Order.find({ user_id: req.session.userid, date_withdraw: { $ne: null } /*order_id: { $ne: '' }*/ }).sort({date_withdraw: -1}).exec((err, order) => {
                res.render("my_history_withdraw", {
                    type_user: req.session.typeUser,
                    stock: stock,
                    orders: order,
                    order: 1,
                    showname: req.session.username,
                    today: new Date()
                })
            })
        })
    }
    else {
        res.redirect('/')
    }
})

module.exports = router