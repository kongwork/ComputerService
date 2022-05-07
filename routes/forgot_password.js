const express = require("express")
const router = express.Router()

router.get("/forgot_password", (req, res) => {
    res.render('forgot_password')
})

module.exports = router