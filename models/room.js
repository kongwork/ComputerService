// use mongoose
const mongoose = require('mongoose')

// connect MongoDB
const dbUrl = "mongodb://localhost:27017/mydb"
mongoose.connect(dbUrl, {
    useNewUrlparser: true,
    useUnifiedTopology: true
}).catch(err => console.log(err))

// design Schema
let roomSchema = mongoose.Schema({
    r_faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'faculties' },
    r_branch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'branches' },
    r_name: String,
    r_capacity: Number
});

// create model
let Room = mongoose.model("room", roomSchema)

// export model
module.exports = Room

//for save data
module.exports.saveRoom = function (model, data) {
    model.save(data)
}