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

const page_admin_user = require('./routes/admin/page/user')
const page_admin_faculty = require("./routes/admin/page/faculty")
const page_admin_branch = require("./routes/admin/page/branch")
const page_admin_category = require("./routes/admin/page/category")
const page_admin_device = require("./routes/admin/page/device")
const page_admin_maintenance = require("./routes/admin/page/maintenance")
const page_admin_room = require("./routes/admin/page/room")
const page_admin_repair_history = require("./routes/admin/page/repair_history")
const page_admin_stock = require("./routes/admin/page/stock")
const page_admin_cart = require("./routes/admin/page/cart")
const page_admin_my_history_withdraw = require("./routes/admin/page/my_history_withdraw")
const page_admin_all_history_withdraw = require("./routes/admin/page/all_history_withdraw")
const page_admin_device_in_category = require("./routes/admin/page/view_device_in_category")
const page_admin_device_in_room = require("./routes/admin/page/view_device_in_room")
const page_admin_allow_withdraw = require("./routes/admin/page/allow_withdraw")

const add_user = require("./routes/admin/form_add_data/user")
const add_faculty = require("./routes/admin/form_add_data/faculty")
const add_branch = require("./routes/admin/form_add_data/branch")
const add_category = require("./routes/admin/form_add_data/category")
const add_device = require("./routes/admin/form_add_data/device")
const add_room = require("./routes/admin/form_add_data/room")
const add_product = require("./routes/admin/form_add_data/product")
const add_order = require("./routes/admin/form_add_data/order")
const allow_withdraw = require("./routes/admin/form_add_data/allow_withdraw")

const edit_user = require("./routes/admin/edit_data/user")
const edit_faculty = require("./routes/admin/edit_data/faculty")
const edit_branch = require("./routes/admin/edit_data/branch")
const edit_category = require("./routes/admin/edit_data/category")
const edit_device = require("./routes/admin/edit_data/device")
const edit_room = require("./routes/admin/edit_data/room")
const edit_product = require("./routes/admin/edit_data/product")
const edit_order = require("./routes/admin/edit_data/order")

const delete_user = require("./routes/admin/delete_data/delete_user")
const delete_faculty = require("./routes/admin/delete_data/faculty")
const delete_branch = require("./routes/admin/delete_data/branch")
const delete_category = require("./routes/admin/delete_data/delete_category")
const delete_device = require("./routes/admin/delete_data/delete_device")
const delete_maintenance = require("./routes/admin/delete_data/delete_maintenance")
const delete_room = require("./routes/admin/delete_data/room")
const delete_product = require("./routes/admin/delete_data/product")
const delete_order = require("./routes/admin/delete_data/order")

const search_user = require("./routes/admin/search_data/user")
const search_category = require("./routes/admin/search_data/category")
const search_room = require("./routes/admin/search_data/room")
const search_product = require("./routes/admin/search_data/product")
const search_device = require("./routes/admin/search_data/search_device")
const search_maintenance = require("./routes/admin/search_data/search_maintenance")
const search_faculty = require("./routes/admin/search_data/faculty")
const search_branch = require("./routes/admin/search_data/branch")
const search_list_inform = require("./routes/user/search_data/list_inform")
const search_category_page_user = require("./routes/user/search_data/category")
const search_device_page_user = require("./routes/user/search_data/device")
const search_room_page_user = require("./routes/user/search_data/room")

const CheckMaintenance = require("./routes/admin/page/CheckMaintenance")
const ImportFileFaculty = require("./routes/admin/form_add_data/import_faculty_xlsx")
const ImportFileBranch = require("./routes/admin/form_add_data/import_branch_xlsx")

const ReportRepairHistory = require("./routes/admin/report/repair_history")
const ReportDevice = require("./routes/admin/report/device")
const report_my_withdraw = require("./routes/admin/report/my_withdraw")
const report_all_withdraw = require("./routes/admin/report/all_withdraw")

const dispose = require("./routes/admin/dispose")

const page_user_view_category_device = require("./routes/user/view_category_device")
const page_user_room = require("./routes/user/page/room")
const page_user_room_device = require("./routes/user/page/room_device")

const withdraw = require("./routes/admin/form_add_data/withdraw")
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
    __dirname + '/views/report',
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
    page_admin_room,
    page_admin_repair_history,
    page_admin_stock,
    page_admin_cart,
    page_admin_my_history_withdraw,
    page_admin_all_history_withdraw,
    page_admin_device_in_category,
    page_admin_device_in_room,
    page_admin_allow_withdraw,

    page_user_view_category_device,
    page_user_room,
    page_user_room_device,
    // เพิ่มข้อมูล
    add_user,
    add_faculty,
    add_branch,
    add_device,
    add_category,
    add_room,
    add_product,
    add_order,
    allow_withdraw,
    // แก้ไขข้อมูล
    edit_faculty,
    edit_branch,
    edit_device,
    edit_category,
    edit_user,
    edit_room,
    edit_product,
    edit_order,
    // ลบข้อมูล
    delete_user,
    delete_category,
    delete_branch,
    delete_faculty,
    delete_device,
    delete_maintenance,
    delete_room,
    delete_product,
    delete_order,
    // ค้นหาข้อมูล
    search_user,
    search_category,
    search_room,
    search_product,
    search_maintenance,
    search_device,
    search_faculty,
    search_branch,
    search_list_inform,
    search_category_page_user,
    search_device_page_user,
    search_room_page_user,

    ReportRepairHistory,
    ReportDevice,
    report_my_withdraw,
    report_all_withdraw,

    CheckMaintenance,
    ImportFileFaculty,
    ImportFileBranch,

    dispose,
    // For User
    ListInform,
    User_Device,
    User_Category,
    Inform,
    //re,
    report,
    
    DetailInform,
    withdraw
)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(8080, () => {
    console.log("start server in port 8080")
})