const express = require("express")
const router = express.Router()
const Order = require("../../../models/order")

router.post("/add-order", (req, res) => {
    let data = new Order({
        order_id: '',
        user_id: req.session.userid,
        product_id: req.body.id,
        product_number: req.body.order_number,
        date_withdraw: '',
        status: ''
    })
    Order.saveOrder(data, (err) => {
        if (err) console.log(err)
        res.redirect("/stock")
    })
})

module.exports = router