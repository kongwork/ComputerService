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
const user = require('./routes/admin/user')
const AddUser = require("./routes/admin/form_add_data/user")
const delete_user = require("./routes/delete_user")
const edit_user = require("./routes/edit_user")
const SearchUser = require("./routes/search_user")

// Faculty
const Faculty = require("./routes/admin/faculty")
const AddFaculty = require("./routes/admin/form_add_data/faculty")
const DeleteFaculty = require("./routes/admin/delete_data/faculty")

// Branch
const Branch = require("./routes/admin/branch")
const AddBranch = require("./routes/admin/form_add_data/branch")

// Category
const Category = require("./routes/admin/category")
const AddCategory = require("./routes/admin/form_add_data/category")
const delete_category = require("./routes/delete_category")
const SearchCategory = require("./routes/search_category")
const edit_category = require("./routes/edit_category")
// Device
const Device = require("./routes/admin/device")
const AddDevice = require("./routes/form_AddDevice")
const delete_device = require("./routes/delete_device")
const edit_device = require("./routes/edit_device")
// Maintenance
const Maintenance = require("./routes/admin/maintenance")
const CheckMaintenance = require("./routes/admin/CheckMaintenance")
const DeleteMaintenance = require("./routes/delete_maintenance")
const SearchMaintenance = require("./routes/search_maintenance")

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
    SearchMaintenance,
    Faculty,
    AddFaculty,
    DeleteFaculty,
    AddBranch,
    Branch,

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