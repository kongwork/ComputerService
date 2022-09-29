const express = require("express")
const router = express.Router()
const User = require("../../../models/user")
const Maintenance = require("../../../models/maintenance")


router.get("/repair-history/:id", (req, res) => {
    Maintenance.find({DeviceID: req.params.id, MTN_Status:'3'}).exec((err, maintenance) => {
        User.find().exec((err, user) => {
            res.render("repair_history",{
                type_user: req.session.typeUser,
                showname: req.session.username,
                order: 1,
                history: maintenance,
                DeviceID: req.params.id,
                user: user
            })
        })
    })
})

module.exports = router