const express = require("express")
const router = express.Router()
const XLSX = require('xlsx')
const Faculty = require("../../../models/faculties")
const multer = require("multer")

const storage = multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null, "./public/uploads") //ตำแหน่งเก็บไฟล์
    },
    filename:function (req, file, cb) {
        cb(null, Date.now()+'.xlsx') //เปลี่ยนชื่อไฟล์ ้ป้องกันชื่อไฟล์ซ้ำกัน
    },
})

const upload = multer ({ storage: storage })

router.post('/import-file-faculty' , upload.single("filexlsx"), (req, res) => {

    const workbook = XLSX.readFile("./public/uploads/" + req.file.filename);
    const sheetNames = workbook.SheetNames;

    // Get the data of "Sheet1"
    const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
    console.log(worksheet)
    worksheet.map((doc) => {
        let data = new Faculty({
            Faculty: doc.Faculty,
        })
        Faculty.saveFaculty(data, (err) => {
            if (err) console.log(err)
        })
    })
    res.redirect('/faculty')
})

module.exports = router