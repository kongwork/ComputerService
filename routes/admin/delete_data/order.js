const express = require("express")
const router = express.Router()
const Order = require('../../../models/order')

router.get("/delete-order/:id", (req, res) => {
    Order.findByIdAndDelete(req.params.id, { useFindAndModify: false }).exec(err => {
        if (err) console.log(err)
        res.redirect('/cart')
    })
})

router.post("/MultiDelete-order", (req, res) => {
    const checkedItemId = req.body.deleteArray
    const splitArray = checkedItemId.split(",")
    splitArray.forEach((item) => {
        Order.findByIdAndRemove(item, function (err) {
            if (!err) console.log(`Successfully deleted id: ${item}`)
        })
    })
    res.redirect("/cart")
})

module.exports = router