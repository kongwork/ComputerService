const express = require("express")
const router = express.Router()
const Device = require("../models/device")
const Category = require("../models/category")
const Maintenance = require("../models/maintenance")


router.get("/list_inform", (req, res) => {
    const showname = req.session.username
    if (req.session.login && req.session.typeUser === 'User') {
        Maintenance.find({ UserID: req.session.userid }).exec((err, doc) => {
            res.render('list_inform', {
                MTN: doc,
                order: 1,
                showname: showname
            })
        })
    }
    else {
        res.redirect('/')
    }
})

router.get("/CancelInform/:id", (req, res) => {
    Maintenance.findByIdAndUpdate(req.params.id, { MTN_Status: "0" }).exec(err => {
        if (err) console.log(err)
        res.redirect('/list_inform')
    })
})

router.post("/MultiCancelInform", (req, res) => {
    const checkedItemId = req.body.deleteArray;
    const splitArray = checkedItemId.split(",");
    splitArray.forEach((item) => {
        Maintenance.findByIdAndUpdate(item, { MTN_Status: "0" }).exec(err => {
            if (!err) console.log(`Successfully cancel id: ${item}`);
        });
    });
    res.redirect("/list_inform");
});

module.exports = router;