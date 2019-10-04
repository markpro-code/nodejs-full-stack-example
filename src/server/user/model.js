const mongoose = require('mongoose')

const schema = {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
}

this.Schema = new mongoose.Schema(schema, {
    timestamps: true,
    strictQuery: 'throw',
})

const ProductModel = mongoose.model('product', this.Schema)

module.exports = {
    ProductModel,
}
