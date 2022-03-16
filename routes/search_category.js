const express = require("express")
const router = express.Router()
const Category = require('../models/category')

router.post("/searchCategory", (req, res) => {
    const showname = req.session.username
    let order = 1
    let query = { CategoryName: { $regex: '^' + req.body.search, $options: 'i' } }
    input_search_null = req.body.search
    if (input_search_null === "") {
        res.redirect("/category")
    }
    else {
        Category.find(query).exec((err, doc) => {
            res.render("search_category", {
                categorys: doc,
                order: order,
                showname: showname
            })
            console.log(doc)
        })
    }
})

module.exports = router