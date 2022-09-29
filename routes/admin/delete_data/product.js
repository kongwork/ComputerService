const express = require("express")
const router = express.Router()
const Product = require('../../../models/product')

router.get("/delete-product/:id", (req, res) => {
    Stock.findByIdAndDelete(req.params.id, { useFindAndModify: false }).exec(err => {
        if (err) console.log(err)
        res.redirect('/stock')
    })
})

router.post("/MultiDelete-product", (req, res) => {
    const checkedItemId = req.body.deleteArray
    const splitArray = checkedItemId.split(",")
    splitArray.forEach((item) => {
        Product.findByIdAndRemove(item, function (err) {
            if (!err) console.log(`Successfully deleted id: ${item}`)
        })
    })
    res.redirect("/stock")
})

module.exports = router