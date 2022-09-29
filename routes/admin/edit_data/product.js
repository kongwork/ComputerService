const express = require("express")
const router = express.Router()
const Product = require("../../../models/product")

// แก้ไขคณะ
router.post("/edit-product", (req, res) => {
    let data = {
        product_name: req.body.st_name,
        product_number: req.body.st_number,
        product_price: req.body.st_price
    }
    // อัพเดตข้อมูล
    Product.findByIdAndUpdate( req.body.id, data, { useFindAndModify: false } ).exec(err => {
        res.redirect("/stock")
    })
})

module.exports = router