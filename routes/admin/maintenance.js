const express = require("express")
const router = express.Router()
const Maintenance = require("../../models/maintenance")

router.get("/maintenance", (req, res) => {
    const showname = req.session.username
    if (req.session.login && req.session.typeUser == 'Admin') {
        Maintenance.find().exec((err, doc) => {
            res.render("maintenance", {
                order: order = 1,
                showname: showname,
                MTN: doc
            })
        })
    }
    else {
        res.redirect('/')
    }
})

module.exports = router