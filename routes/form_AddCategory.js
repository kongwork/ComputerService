const express = require("express")
const router = express.Router()
const Category = require("../models/category")

router.get("/form_AddCategory", (req, res) => {
    const showname = req.session.username
    if (req.session.login) {
        res.render("form_AddCategory", { showname: showname })
    }
    else {
        res.redirect('/')
    }
})

router.post("/insertCategory", (req, res) => {
    const category = req.body.category;
    console.log(category)
    Category.findOne({ CategoryName: category }).exec((err, doc) => {
        if (!doc) {
            let data = new Category({
                CategoryName: category
            })
            Category.saveCategory(data, (err) => {
                if (err) console.log(err)
                res.redirect("/category")
            })
        }
        else {
            res.redirect("/form_AddCategory")
        }
    })
})

module.exports = router