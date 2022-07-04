// use mongoose
const mongoose = require('mongoose')

// connect MongoDB
const dbUrl = "mongodb://localhost:27017/mydb"
mongoose.connect(dbUrl, {
    useNewUrlparser: true,
    useUnifiedTopology: true
}).catch(err => console.log(err))

// design Schema
let facultiesSchema = mongoose.Schema({
    Faculty: String
});

// create model
let Faculties = mongoose.model("faculties", facultiesSchema)

// export model
module.exports = Faculties

//for save data
module.exports.saveFaculty = function (model, data) {
    model.save(data)
}