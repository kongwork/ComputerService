const express = require("express")
const router = express.Router()
const Device = require('../../models/device')
const Maintenance = require('../../models/maintenance')

router.get("/dispose/:id", (req, res) => {
    Maintenance.findOne({ DeviceID: req.params.id, MTN_Status: {$in: ['1', '2']} }).exec((err, maintenance) => {
        if ( maintenance ) {
            res.cookie('dispose_fail',true,{maxAge:2000})
            res.redirect("/device")
        }
        else {
            let data = {
                DateDispose: Date.now(),
                DeviceStatus: '2'

            }
            // อัพเดตข้อมูล Device
            Device.findOneAndUpdate( {DeviceCode: req.params.id}, data, { useFindAndModify: false } ).exec(err => {
                res.redirect("/device")
            })
        }
        console.log(maintenance)
    })
})

// router.get("/multi-dispose", (req, res) => {
//     const checkedItemId = req.body.deleteArray;
//     const splitArray = checkedItemId.split(",");
//     splitArray.forEach((item) => {
//         Maintenance.findOne(item, function (err) {
//             if (!err) console.log(`Successfully deleted id: ${item}`);
//         });
//     });
//     res.redirect("/user");
// })

module.exports = router