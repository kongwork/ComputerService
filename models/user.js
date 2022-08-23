// use mongoose
const mongoose = require('mongoose')

// connect MongoDB
const dbUrl = "mongodb://localhost:27017/mydb"
mongoose.connect(dbUrl, {
    useNewUrlparser: true,
    useUnifiedTopology: true
}).catch(err => console.log(err))

// design Schema
let userSchema = mongoose.Schema({
    FacultyID: { type: mongoose.Schema.Types.ObjectId, ref: 'faculties' },
    BranchID: { type: mongoose.Schema.Types.ObjectId, ref: 'branches' },
    Prefix: String,
    FirstName: String,
    LastName: String,
    UserName: String,
    Email: String,
    PhoneNumber: String,
    Password: String,
    TypeUser: String,
    DateAdded: Date
});

// create model
let User = mongoose.model("users", userSchema)

// export model
module.exports = User

//for save data
module.exports.saveUser = function (model, data) {
    model.save(data)
}