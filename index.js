const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const index = require('./routes/index')
const login = require('./routes/login')
const logout = require('./routes/logout')

// ForgotPass
const ForgotPass = require('./routes/forgot_password')
const MailResetPass = require('./routes/mail_notify_reset_pass')

const page_admin_user = require('./routes/admin/user')
const page_admin_faculty = require("./routes/admin/faculty")
const page_admin_branch = require("./routes/admin/branch")
const page_admin_category = require("./routes/admin/category")
const page_admin_device = require("./routes/admin/device")
const page_admin_maintenance = require("./routes/admin/maintenance")

const add_user = require("./routes/admin/form_add_data/user")
const add_faculty = require("./routes/admin/form_add_data/faculty")
const add_branch = require("./routes/admin/form_add_data/branch")
const add_category = require("./routes/admin/form_add_data/category")
const add_device = require("./routes/form_AddDevice")

const edit_user = require("./routes/edit_user")
const edit_faculty = require("./routes/admin/edit_data/faculty")
const edit_branch = require("./routes/admin/edit_data/branch")
const edit_category = require("./routes/edit_category")
const edit_device = require("./routes/edit_device")

const delete_user = require("./routes/admin/delete_data/delete_user")
const delete_faculty = require("./routes/admin/delete_data/faculty")
const delete_branch = require("./routes/admin/delete_data/branch")
const delete_category = require("./routes/admin/delete_data/delete_category")
const delete_device = require("./routes/admin/delete_data/delete_device")
const delete_maintenance = require("./routes/admin/delete_data/delete_maintenance")

const search_user = require("./routes/admin/search_data/search_user")
const search_category = require("./routes/admin/search_data/search_category")
const search_device = require("./routes/admin/search_data/search_device")
const search_maintenance = require("./routes/admin/search_data/search_maintenance")
const search_faculty = require("./routes/admin/search_data/search_faculty")
const search_branch = require("./routes/admin/search_data/search_branch")
const search_list_inform = require("./routes/admin/search_data/search_list_inform")
const search_category_page_user = require("./routes/admin/search_data/search_category_page_user")
const search_device_page_user = require("./routes/admin/search_data/search_device_page_user")

const CheckMaintenance = require("./routes/admin/CheckMaintenance")



// For user
// List Inform
const ListInform = require("./routes/list_inform")
// Device
const User_Device = require("./routes/user_device")
// Category
const User_Category = require("./routes/user_category")
// Inform
const Inform = require("./routes/inform")
const DetailInform = require("./routes/inform_detail")
//const re = require("./routes/re")
const report = require("./test01/report.js")

const app = express()



app.set('views', [
    __dirname + '/views',
    __dirname + '/views/admin',
    __dirname + '/views/user' 
])
app.set('view engine', 'ejs')

app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(session({ secret: "mysession", resave: false, saveUninitialized: false }))
app.use(
    index,
    login,
    logout,
    ForgotPass,
    MailResetPass,

    // For Admin 
    
    
    page_admin_user,
    page_admin_faculty,
    page_admin_branch,
    page_admin_category,
    page_admin_device,
    page_admin_maintenance,
    // เพิ่มข้อมูล
    add_user,
    add_faculty,
    add_branch,
    add_device,
    add_category,
    // แก้ไขข้อมูล
    edit_faculty,
    edit_branch,
    edit_device,
    edit_category,
    edit_user,
    // ลบข้อมูล
    delete_user,
    delete_category,
    delete_branch,
    delete_faculty,
    delete_device,
    delete_maintenance,
    // ค้นหาข้อมูล
    search_user,
    search_category,
    search_maintenance,
    search_device,
    search_faculty,
    search_branch,
    search_list_inform,
    search_category_page_user,
    search_device_page_user,

    CheckMaintenance,

    // For User
    ListInform,
    User_Device,
    User_Category,
    Inform,
    //re,
    report,
    
    DetailInform
)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(8080, () => {
    console.log("start server in port 8080")
})