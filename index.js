const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const pdf = require('express-pdf');
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

// For user
// List Inform
const ListInform = require("./routes/list_inform")
// Device
const User_Device = require("./routes/user_device")
// Category
const User_Category = require("./routes/user_category")
// Inform
const Inform = require("./routes/inform")
//const re = require("./routes/re")
const report = require("./report/report.js")

const app = express()



app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(pdf)
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
    report
)
app.use(express.static(path.join(__dirname, 'public')))

/*var pdf = require("pdf-creator-node");
var fs = require("fs");

var tem = fs.readFileSync("tem.ejs", "utf8");

var options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};

var users = [
    {
        name: "Shyam",
        age: "26",
    },
    {
        name: "Navjot",
        age: "26",
    },
    {
        name: "Vitthal",
        age: "26",
    },
];

var document = {
    html: tem,
    data: {
        users: users,
    },
    path: "./output.pdf",
    type: "",
};

pdf
    .create(document, options)
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.error(error);
    });*/

app.listen(8080, () => {
    console.log("start server in port 8080")
})