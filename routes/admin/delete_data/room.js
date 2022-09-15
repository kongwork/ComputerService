const express = require("express")
const router = express.Router()
const Room = require('../../../models/room')

router.get("/delete-room/:id", (req, res) => {
    Room.findByIdAndDelete(req.params.id, { useFindAndModify: false }).exec(err => {
        if (err) console.log(err)
        res.redirect('/room')
    })
})

router.post("/MultiDelete-room", (req, res) => {
    const checkedItemId = req.body.deleteArray;
    const splitArray = checkedItemId.split(",");
    splitArray.forEach((item) => {
        Room.findByIdAndRemove(item, function (err) {
            if (!err) console.log(`Successfully deleted id: ${item}`);
        });
    });
    res.redirect("/room");
});

module.exports = router