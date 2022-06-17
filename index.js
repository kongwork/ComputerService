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

// User
const user = require('./routes/user')
const AddUser = require("./routes/form_AddUser")
const delete_user = require("./routes/delete_user")
const edit_user = require("./routes/edit_user")
const SearchUser = require("./routes/search_user")

// Category
const Category = require("./routes/category")
const AddCategory = require("./routes/form_AddCategory")
const delete_category = require("./routes/delete_category")
const SearchCategory = require("./routes/search_category")
const edit_category = require("./routes/edit_category")
// Device
const Device = require("./routes/device")
const AddDevice = require("./routes/form_AddDevice")
const delete_device = require("./routes/delete_device")
const edit_device = require("./routes/edit_device")
// Maintenance
const Maintenance = require("./routes/maintenance")
const CheckMaintenance = require("./routes/CheckMaintenance")
const DeleteMaintenance = require("./routes/delete_maintenance")

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
const report = require("./report/report.js")

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
    user,
    AddUser,
    delete_user,
    edit_user,
    SearchUser,
    Category,
    AddCategory,
    delete_category,
    SearchCategory,
    edit_category,
    Device,
    AddDevice,
    delete_device,
    edit_device,
    Maintenance,
    CheckMaintenance,

    // For User
    ListInform,
    User_Device,
    User_Category,
    Inform,
    //re,
    report,
    DeleteMaintenance,
    DetailInform
)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(8080, () => {
    console.log("start server in port 8080")
})