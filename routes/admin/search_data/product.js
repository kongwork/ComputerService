const express = require("express")
const router = express.Router()
const Product = require("../../../models/product")

router.post("/search-product", (req, res) => {
    let query = { product_name: { $regex: '^' + req.body.search, $options: 'i' } }
    input_search_null = req.body.search
    if (input_search_null === "") {
        res.redirect("/stock")
    }
    else {
        Product.find(query).exec((err, product) => {
            res.render("stock", {
                type_user: req.session.typeUser,
                stock: product,
                order: 1,
                showname: req.session.username
            })
        })
    }
})

module.exports = router