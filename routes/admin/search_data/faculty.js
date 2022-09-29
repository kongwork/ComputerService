const express = require("express")
const router = express.Router()
const Faculty = require('../../../models/faculties')
const Branch = require('../../../models/branches')

router.post("/search-faculty", (req, res) => {
    const showname = req.session.username
    let query = { Faculty: { $regex: '^' + req.body.search, $options: 'i' } }
    input_search_null = req.body.search
    if (input_search_null === "") {
        res.redirect("/faculty")
    }
    else {
        Faculty.find(query).exec((err, doc) => {
            Branch.find().exec((err, branch) => {
                res.render("faculty", {
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