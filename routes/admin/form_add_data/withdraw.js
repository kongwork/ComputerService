const express = require("express")
const router = express.Router()
const Order = require("../../../models/order")
const Product = require("../../../models/product")

router.get("/withdraw", (req, res) => {
    Order.find({user_id: req.session.userid, date_withdraw: null}).exec((err, order) => {
        Product.find().exec((err, product) => {
            function check_order_fail() {
                for(let index_order=0; index_order < order.length; index_order++) {
                    for(let i=0; i < product.length; i++) {
                        if (product[i]._id.toString() == order[index_order].product_id.toString()) {
                            if (product[i].product_number < order[index_order].product_number) {
                                return true
                            }
                        }
                    }
                }
            }
            if (check_order_fail()) {
                res.cookie('order_fail',true,{maxAge:2000})
                res.redirect("/cart")
            }
            else {
                for(let index_order=0; index_order < order.length; index_order++) {
                    for(let i=0; i < product.length; i++) {
                        if (product[i]._id.toString() == order[index_order].product_id.toString()) {
                            let data = {
                               product_number: product[i].product_number - order[index_order].product_number
                            }
                            Product.findByIdAndUpdate(product[i]._id, data, { useFindAndModify: false }, function (err) {
                                if (!err) console.log(`Successfully Update Product ID: ${product[i]._id}`)
                            })
                        }
                    }
                }
                let data = {
                    date_withdraw: Date.now()
                }
                // อัพเดตข้อมูล
                Order.updateMany({ user_id: req.session.userid, date_withdraw: null }, data, { useFindAndModify: false } ).exec(err => {
                    res.redirect("/cart")
                })
            }
        })
    })
})

module.exports = router