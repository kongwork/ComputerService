const express = require("express")
const router = express.Router()
const Product = require("../../../models/product")

router.get("/stock", (req, res) => {
    const showname = req.session.username
    const fname = req.session.fname
    const lname = req.session.lname
    if (req.session.login && (req.session.typeUser == 'Admin' || req.session.typeUser == 'Technician')) {
        Product.find().exec((err, product) => {
            res.render("stock", {
                type_user: req.session.typeUser,
                stock: product,
                order: 1,
                showname: showname,
                fname: fname,
                lname: lname
            })
        })
    }
    else {
        res.redirect('/')
    }
})

module.exports = router