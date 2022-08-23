const express = require("express")
const router = express.Router()
const Branch = require('../../../models/branches')

router.post("/DeleteBranch/:facultyId", (req, res) => {
    Branch.findByIdAndDelete(req.body.id_branch, { useFindAndModify: false }).exec(err => {
        if (err) console.log(err)
        res.redirect(`/branch/${req.params.facultyId}`)
    })
})

router.post("/MultiDeleteBranch", (req, res) => {
    const checkedItemId = req.body.deleteArray;
    const splitArray = checkedItemId.split(",");
    splitArray.forEach((item) => {
        Branch.findByIdAndRemove(item, function (err) {
            if (!err) console.log(`Successfully deleted id: ${item}`);
        });
    });
    res.redirect(`/branch/${req.body.facultyId}`)
});

module.exports = router