const express = require("express")
const router = express.Router()
const Device = require('../models/device')
const Category = require('../models/category')

router.get("/user_device", (req, res) => {
    const showname = req.session.username
    if (req.session.login && req.session.typeUser === 'User') {
        Category.find().exec((err, category) => {
            Device.find().exec((err, device) => {
                res.render("user_device", {
                    category: category,
                    devices: device,
                    order: 1,
                    showname: showname
                })
            })
        })
        // let order = 1
        // let MongoClient = require('mongodb').MongoClient;
        // let url = "mongodb://localhost:27017/";

        // MongoClient.connect(url, function (err, db) {
        //     if (err) throw err;
        //     var dbo = db.db("mydb");
        //     dbo.collection('devices').aggregate([
        //         {
        //             $lookup:
        //             {
        //                 from: 'categorys',
        //                 localField: 'CategoryID',
        //                 foreignField: '_id',
        //                 as: 'details'
        //             }
        //         }
        //     ]).toArray(function (err, doc) {
        //         if (err) throw err;
        //         res.render("user_device", { devices: doc, order: order, showname: showname })
        //         console.log(JSON.stringify(res, ['_id', 'details', 'CategoryName']));
        //         db.close();
        //     });
        // });
    }
    else {
        res.redirect('/')
    }
})

module.exports = router