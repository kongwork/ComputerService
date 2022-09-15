const express = require("express")
const router = express.Router()
const Maintenance = require("../../../models/maintenance")


router.get("/repair-history/:id", (req, res) => {
    Maintenance.find({DeviceID: req.params.id, MTN_Status:'3'}).exec((err, maintenance) => {
        res.render("repair_history",{
            showname: req.session.username,
            order: 1,
            history: maintenance,
            DeviceID: req.params.id
        })
        console.log(maintenance)
    })
})

module.exports = router