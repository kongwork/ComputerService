const express = require("express")
const router = express.Router()

router.get("/maintenance", (req, res) => {
    const showname = req.session.username
    if (req.session.login && req.session.typeUser === 'Admin') {
        res.render("maintenance", { showname: showname })
    }
    else {
        res.redirect('/')
    }
})

module.exports = router