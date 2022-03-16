const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    console.log(req.session)
    const passfail = 'Username หรือ Password ผิด'
    if (req.session.login_fail != true) {
        res.render("index.ejs", { success: '' })
    }
    else {
        res.render("index.ejs", { success: passfail })
    }
})

module.exports = router