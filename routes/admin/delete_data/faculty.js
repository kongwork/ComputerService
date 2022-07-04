const express = require("express")
const router = express.Router()
const Faculty = require('../../../models/faculties')

router.get("/DeleteFaculty/:id", (req, res) => {
    Faculty.findByIdAndDelete(req.params.id, { useFindAndModify: false }).exec(err => {
        if (err) console.log(err)
        res.redirect('/faculty')
    })
})

router.post("/MultiDeleteFaculty", (req, res) => {
    const checkedItemId = req.body.deleteArray;
    const splitArray = checkedItemId.split(",");
    splitArray.forEach((item) => {
        Faculty.findByIdAndRemove(item, function (err) {
            if (!err) console.log(`Successfully deleted id: ${item}`);
        });
    });
    res.redirect("/faculty");
});

module.exports = router