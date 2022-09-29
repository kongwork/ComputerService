const express = require("express")
const router = express.Router()
const Faculty = require('../../../models/faculties')
const Branch = require('../../../models/branches')

router.post("/search-branch/:faculty_id", (req, res) => {
    const showname = req.session.username
    let query = { Branch: { $regex: '^' + req.body.search, $options: 'i' } }
    console.log(query)
    input_search_null = req.body.search
    if (input_search_null === "") {
        res.redirect("/branch/"+ req.params.faculty_id)
    }
    else {
        Faculty.findOne({ _id: req.params.faculty_id}).exec((err, doc) => {
            Branch.find(query).exec((err, branch) => {
                res.render("branch", {
                    faculty_id: req.params.faculty_id,
                    faculty: doc,
                    branch: branch,
                    order: 1,
                    showname: showname
                })
                console.log(doc)
            })
        })
    }
})

module.exports = router