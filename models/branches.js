// use mongoose
const mongoose = require('mongoose')

// connect MongoDB
const dbUrl = "mongodb://localhost:27017/mydb"
mongoose.connect(dbUrl, {
    useNewUrlparser: true,
    useUnifiedTopology: true
}).catch(err => console.log(err))

// design Schema
let branchSchema = mongoose.Schema({
    FacultyID: { type: mongoose.Schema.Types.ObjectId, ref: 'faculties' },
    Branch: String
});

// create model
let Branch = mongoose.model("branch", branchSchema)

// export model
module.exports = Branch

//for save data
module.exports.saveBranch = function (model, data) {
    model.save(data)
}