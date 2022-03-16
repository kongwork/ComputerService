const express = require("express")
const router = express.Router()
const Category = require("../models/category")

router.get("/user_category", (req, res) => {
    const showname = req.session.username
    if (req.session.login && req.session.typeUser === 'User') {
        let order = 1
        Category.find().exec((err, doc) => {
            res.render("user_category", { categorys: doc, order: order, showname: showname })
        })
    }
    else {
        res.redirect('/')
    }
})

module.exports = router