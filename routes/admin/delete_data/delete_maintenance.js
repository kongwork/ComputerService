const express = require("express")
const router = express.Router()
const Maintenance = require('../../../models/maintenance')

router.get("/delete_maintenance/:id", (req, res) => {
    Maintenance.findByIdAndDelete(req.params.id, { useFindAndModify: false }).exec(err => {
        if (err) console.log(err)
        res.redirect('/maintenance')
    })
})

router.post("/MultiDeleteMaintenance", (req, res) => {
    const checkedItemId = req.body.deleteArray;
    const splitArray = checkedItemId.split(",");
    splitArray.forEach((item) => {
        Maintenance.findByIdAndRemove(item, function (err) {
            if (!err) console.log(`Successfully deleted id: ${item}`);
        });
    });
    res.redirect("/maintenance");
});

module.exports = router