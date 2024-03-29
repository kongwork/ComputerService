// use mongoose
const mongoose = require('mongoose')

// connect MongoDB
const dbUrl = "mongodb://localhost:27017/mydb"
mongoose.connect(dbUrl, {
    useNewUrlparser: true,
    useUnifiedTopology: true
}).catch(err => console.log(err))

// design Schema
let maintenanceSchema = mongoose.Schema({
    UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    UserInform: String,
    UserFirstName: String,
    UserLastName: String,
    PhoneNumber: String,
    DeviceID: String,
    DeviceName: String,
    MTN_Status: String,
    MTN_Date: Date,
    MTN_CheckDate: Date,
    MTN_Detail: String,
    MTN_Cause: String,
    MTN_Img:[]
});

// create model
let Maintenance = mongoose.model("maintenances", maintenanceSchema)

// export model
module.exports = Maintenance

//for save data
module.exports.saveMaintenance = function (model, data) {
    model.save(data)
}