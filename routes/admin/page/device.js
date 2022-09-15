const express = require("express")
const Device = require("../../../models/device")
const Maintenance = require("../../../models/maintenance")
const router = express.Router()

router.get("/device", (req, res) => {
    const showname = req.session.username
    if (req.session.login && req.session.typeUser == 'Admin') {
        Device.find().exec((err, device) => {
            Maintenance.find().exec((err, maintenance) => {
                if (req.cookies.dispose_fail) {
                    res.render("device", { 
                        dispose_fail: true,
                        maintenance: maintenance,
                        devices: device,
                        order: 1,
                        showname: showname,
                        today: new Date()
                    })
                }
                else {
                    res.render("device", { 
                        dispose_fail: false,
                        maintenance: maintenance,
                        devices: device,
                        order: 1,
                        showname: showname,
                        today: new Date()
                    })
                }
            })
        })
        //แสดงผลหน้า Template <%= JSON.stringify(item.details,[ 'details', 'CategoryName']).slice(18,-3); %>
        /*let MongoClient = require('mongodb').MongoClient;
        let url = "mongodb://localhost:27017/";

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection('devices').aggregate([
                {
                    $lookup:
                    {
                        from: 'categorys',
                        localField: 'CategoryID',
                        foreignField: '_id',
                        as: 'details'
                    }
                }
            ]).toArray(function (err, doc) {
                if (err) throw err;
                res.render("device", { devices: doc, order: order, showname: showname })
                console.log(JSON.stringify(res, ['_id', 'details', 'CategoryName']));
                db.close();
            });
        });*/
    }
    else {
        res.redirect('/')
    }
})

module.exports = router