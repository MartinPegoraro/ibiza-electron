const { model, Schema } = require('mongoose');

const newSchema = new Schema({
    name: {
        type: String
    },
    date: {
        type: Date,
    },
    cantidad: {
        type: Number
    }
})

module.exports = model('Fechas', newSchema)
