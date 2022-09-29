const express = require("express")
const router = express.Router()
const Device = require('../../../models/device')
const Maintenance = require("../../../models/maintenance")

router.post("/search-device", (req, res) => {
    const showname = req.session.username
    let query = { DeviceCode: { $regex: '^' + req.body.search, $options: 'i' } }
    input_search_null = req.body.search
    if (input_search_null === "") {
        res.redirect("/device")
    }
    else {
        Device.find(query).exec((err, device) => {
            Maintenance.find().exec((err, maintenance) => {
                if (req.cookies.dispose_fail) {
                    res.render("device", {
                        type_user: req.session.typeUser,
                        dispose_fail: true,
                        maintenance: maintenance,
                        devices: device,
                        order: 1,
                        showname: showname,
                        today: new Date()
                    })
                }
                else {
                    res.render("device", {
                        type_user: req.session.typeUser,
                        dispose_fail: false,
                        maintenance: maintenance,
                        devices: device,
                        order: 1,
                        showname: showname,
                        today: new Date()
                    })
                }
            })
        })
    }
})

module.exports = router