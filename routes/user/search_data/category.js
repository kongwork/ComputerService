const express = require("express")
const router = express.Router()
const Category = require('../../../models/category')
const Device = require('../../../models/device')

router.post("/search-category-page-user", (req, res) => {
    const showname = req.session.username
    let query = { CategoryName: { $regex: '^' + req.body.search, $options: 'i' } }
    input_search_null = req.body.search
    if (input_search_null === "") {
        res.redirect("/user_category")
    }
    else {
        Category.find(query).exec((err, doc) => {
            Device.find().exec((err, device) => {
                res.render("search_category_page_user", {
                    devices: device,
                    categorys: doc,
                    order: 1,
                    showname: showname
                })
                console.log(doc)
            })
        })
    }
})

module.exports = router