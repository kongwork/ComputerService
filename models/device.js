// use mongoose
const mongoose = require('mongoose')

// connect MongoDB
const dbUrl = "mongodb://localhost:27017/mydb"
mongoose.connect(dbUrl, {
    useNewUrlparser: true,
    useUnifiedTopology: true
}).catch(err => console.log(err))

// design Schema
let deviceSchema = mongoose.Schema({
    RoomID: { type: mongoose.Schema.Types.ObjectId, ref: 'room' },
    CategoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'categorys' },
    FacultyID: { type: mongoose.Schema.Types.ObjectId, ref: 'faculties' },
    BranchID: { type: mongoose.Schema.Types.ObjectId, ref: 'branches' },
    DeviceName: String,
    CategoryName: String,
    DeviceCode: String,
    Price: Number,
    Date: Date,
    DateDispose: Date,
    DeviceStatus: String
});

// create model
let Device = mongoose.model("devices", deviceSchema)

// export model
module.exports = Device

//for save data
module.exports.saveDevice = function (model, data) {
    model.save(data)
}