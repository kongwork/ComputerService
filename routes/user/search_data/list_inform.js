const express = require("express")
const router = express.Router()
const Maintenance = require('../../../models/maintenance')

router.post("/search-list-inform", (req, res) => {
    const showname = req.session.username
    input_search_null = req.body.search
    if (input_search_null === "") {
        res.redirect("/list_inform")
    }
    else {
        Maintenance.find({ UserID: req.session.userid, DeviceID: { $regex: '^' + req.body.search, $options: 'i' } }).exec((err, doc) => {
            res.render('list_inform', {
                MTN: doc,
                order: 1,
                showname: showname
            })
        })
    }
})

module.exports = router