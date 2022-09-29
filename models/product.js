// use mongoose
const mongoose = require('mongoose')

// connect MongoDB
const dbUrl = "mongodb://localhost:27017/mydb"
mongoose.connect(dbUrl, {
    useNewUrlparser: true,
    useUnifiedTopology: true
}).catch(err => console.log(err))

// design Schema
let productSchema = mongoose.Schema({
    product_name: String,
    product_number: Number,
    product_price: Number
});

// create model
let Product = mongoose.model("product", productSchema)

// export model
module.exports = Product

//for save data
module.exports.saveProduct = function (model, data) {
    model.save(data)
}