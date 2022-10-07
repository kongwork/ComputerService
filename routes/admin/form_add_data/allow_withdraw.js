const express = require("express")
const router = express.Router()
const Order = require("../../../models/order")
const Product = require("../../../models/product")

router.get("/allow-withdraw/:id", (req, res) => {
    Order.findOne({_id: req.params.id}).exec((err, order1) => {
        Product.findOne({_id: order1.product_id}).exec((err, product1) => {
            if (order1.product_number <= product1.product_number ) {
                // อัพเดตข้อมูล product
                let data_product = {
                    product_number: product1.product_number - order1.product_number
                }
                Product.findByIdAndUpdate(order1.product_id, data_product, { useFindAndModify: false }, function (err) {
                    if (!err) console.log(`Successfully Update Product ID: ${order1.product_id}`)
                })
                // อัพเดตข้อมูล order
                let data_order = {
                    status: '2'
                }
                Order.findByIdAndUpdate( req.params.id, data_order, { useFindAndModify: false } ).exec(err => {
                    if (!err) console.log(`Successfully Update Order ID: ${req.params.id}`)
                })
                res.redirect("/page-allow-withdraw")
            }
            else {
                res.cookie('order_fail',true,{maxAge:2000})
                res.redirect("/page-allow-withdraw")
            }
        })
    })
})

module.exports = router