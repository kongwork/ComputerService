const express = require("express")
const router = express.Router()
var nodemailer = require("nodemailer")
const User = require("../models/user")

router.post('/send_mail_forgot_pass', (req, res) => {
    /*const email = req.body.email
    const time = 30000; //60000 = 1 นาที*/
    User.findOne({ Email: req.body.email }).exec((err, doc) => {
        if (!doc) {
            res.redirect('/forgot_password')
        }
        else {
            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "kongwork26729@gmail.com",
                    pass: "nongsa7410",
                },
            });

            var mailOptions = {
                from: "kongwork26729@gmail.com",
                to: doc.Email,
                subject: "Sending Email using Node.js",
                text: "That was easy!",
                html: '<a href="http://localhost:8080/change_pass">Click here to reset your password</a>',
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
            //-------------------------------------------------------------------------------------- สร้าง cookie
            /*res.cookie("email", doc.email, { maxAge: time });
            res.cookie("changepass", true, { maxAge: time });*/
            /*req.session.email = doc.email
            req.session.changepass = true
            req.session.cookie.maxAge = time
            res.redirect("/");*/
            res.redirect("/");
        }
    })
})

module.exports = router