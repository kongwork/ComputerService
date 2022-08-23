const express = require("express")
const router = express.Router()
const Device = require('../../../models/device')

router.post("/search-device-page-user", (req, res) => {
    const showname = req.session.username
    let query = { DeviceName: { $regex: '^' + req.body.search, $options: 'i' } }
    input_search_null = req.body.search
    if (input_search_null === "") {
        res.redirect("/user_device")
    }
    else {
        Device.find(query).exec((err, doc) => {
            res.render("search_device_page_user", {
                devices: doc,
                order: 1,
                showname: showname
            })
            console.log(doc)
        })
    }
})

module.exports = router