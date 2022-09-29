const express = require("express")
const router = express.Router()
const Category = require('../../../models/category')
const Device = require("../../../models/device")

router.post("/searchCategory", (req, res) => {
    const showname = req.session.username
    let order = 1
    let query = { CategoryName: { $regex: '^' + req.body.search, $options: 'i' } }
    input_search_null = req.body.search
    if (input_search_null === "") {
        res.redirect("/category")
    }
    else {
        Device.find().exec((err, device) => {
            Category.find(query).exec((err, doc) => {
                res.render("category", {
                    devices: device,
                    categorys: doc,
                    order: order,
                    showname: showname
                })
                console.log(doc)
            })
        })
    }
})

module.exports = router