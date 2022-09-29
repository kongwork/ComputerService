const express = require("express")
const router = express.Router()
const Product = require("../../../models/product")

router.post("/add-product", (req, res) => {
    let data = new Product({
        product_name: req.body.st_name,
        product_number: req.body.st_number,
        product_price: req.body.st_price
    })
    Product.saveProduct(data, (err) => {
        if (err) console.log(err)
        res.redirect("/stock")
    })
})

module.exports = router