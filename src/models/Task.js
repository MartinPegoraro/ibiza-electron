const{model, Schema} = require('mongoose')

const newSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    menu: String
})

module.exports = model('Task',newSchema);