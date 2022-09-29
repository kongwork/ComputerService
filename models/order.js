// use mongoose
const mongoose = require('mongoose')

// connect MongoDB
const dbUrl = "mongodb://localhost:27017/mydb"
mongoose.connect(dbUrl, {
    useNewUrlparser: true,
    useUnifiedTopology: true
}).catch(err => console.log(err))

// design Schema
let orderSchema = mongoose.Schema({
    order_id: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'stock' },
    product_number: Number,
    date_withdraw: Date
});

// create model
let Order = mongoose.model("order", orderSchema)

// export model
module.exports = Order

//for save data
module.exports.saveOrder = function (model, data) {
    model.save(data)
}