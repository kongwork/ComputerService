const express = require("express")
const router = express.Router()
const Faculty = require("../../../models/faculties")
const Branch = require("../../../models/branches")

router.post("/InsertFaculty", (req, res) => {
    /*Faculty.find( { $or:[ { 'Order': req.body.order }, { 'Faculty': req.body.faculty } ]}, 
    function(err,docs){
        if(!err) {
            let data = new Faculty({
                Order : req.body.order,
                Faculty: req.body.faculty
            })
            Faculty.saveFaculty(data, (err) => {
                if (err) console.log(err)
            })
            res.redirect('faculty')
            console.log('777',docs)
        }
        else {
            console.log('-----',docs)
        }
        
    });*/
    //const show_modal = !req.body.modal
    // console.log(show_modal)
    //Faculty.findOne({ Faculty: req.body.faculty, Order: req.body.order }).exec((err, doc) => {
        let data = new Faculty({
            Faculty: req.body.faculty
        })
        Faculty.saveFaculty(data, (err) => {
            if (err) console.log(err)
        })
        res.redirect('faculty')
        /*if (doc) {
            Faculty.find().exec((err, faculty) => {
                Branch.find().exec((err, branch) => {
                    // res.render('faculty', {
                    //     show_modal: show_modal,
                    //     order: 1,
                    //     faculty: faculty,
                    //     branch: branch,
                    //     error: 'insert fail',
                    //     showname: req.session.username
                    // })

                    res.json({
                        data: false
                    })
                })
            })
        }
        else {
            console.log('====== in this. condition')
            let data = new Faculty({
                Order : req.body.order,
                Faculty: req.body.faculty
            })
            Faculty.saveFaculty(data, (err) => {
                if (err) console.log(err)
            })
            res.redirect('faculty')
        }*/
    //})
})

module.exports = router