const express = require("express")
const router = express.Router()
const Category = require("../models/category")
//const Device = require("../models/device")

router.get("/category", (req, res) => {
    /*Device.find({CategoryID: '622dd02497a90567cfe6927e'}).count(function (err, count) {
        console.log("Number of docs: ", count)
    })*/
    const showname = req.session.username
    if (req.session.login && req.session.typeUser === 'Admin') {
        let order = 1
        Category.find().exec((err, doc) => {
            res.render("category", { categorys: doc, order: order, showname: showname })
        })
    }
    else {
        res.redirect('/')
    }
})

module.exports = router