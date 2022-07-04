const express = require("express")
const router = express.Router()
const Faculty = require("../../../models/faculties")

router.post("/InsertFaculty", (req, res) => {
    Faculty.findOne({ Faculty: req.body.faculty }).exec((err, doc) => {
        if (!doc) {
            let data = new Faculty({
                Faculty: req.body.faculty
            })
            Faculty.saveFaculty(data, (err) => {
                if (err) console.log(err)
            })
            res.redirect('faculty')
        }
    })
})

module.exports = router