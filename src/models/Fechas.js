const { model, Schema } = require('mongoose');

const newSchema = new Schema({
    name: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    cantidad: {
        type: Number
    }
})

module.exports = model('Fechas', newSchema)
