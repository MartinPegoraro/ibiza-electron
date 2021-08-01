const { model, Schema } = require('mongoose');

const newSchema = new Schema({
    monto: {
        type: Number
    },

    fecha: {
        type: Date
    }
})

module.exports = model('Ventas', newSchema);