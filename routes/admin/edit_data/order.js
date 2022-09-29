const express = require("express")
const router = express.Router()
const Order = require("../../../models/order")

// แก้ไขคณะ
router.post("/edit-order", (req, res) => {
    let data = {
        product_number: req.body.order_number,
    }
    // อัพเดตข้อมูล
    Order.findByIdAndUpdate( req.body.id, data, { useFindAndModify: false } ).exec(err => {
        res.redirect("/cart")
    })
})

module.exports = router