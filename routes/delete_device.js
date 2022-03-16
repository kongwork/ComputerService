const express = require("express")
const router = express.Router()
const Device = require('../models/device')

router.get("/delete_device/:id", (req, res) => {
    Device.findByIdAndDelete(req.params.id, { useFindAndModify: false }).exec(err => {
        if (err) console.log(err)
        res.redirect('/device')
    })
})

router.post("/MultiDeleteDevice", (req, res) => {
    const checkedItemId = req.body.deleteArray;
    const splitArray = checkedItemId.split(",");
    splitArray.forEach((item) => {
        Device.findByIdAndRemove(item, function (err) {
            if (!err) console.log(`Successfully deleted id: ${item}`);
        });
    });
    res.redirect("/device");
});

module.exports = router