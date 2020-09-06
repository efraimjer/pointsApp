let mongoose = require ('mongoose');

let clientSchema = new mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: Number
    },
    document: {
        type: Number
    },
    pontuation: {
        type: Number
    },
    adress: {
        type: String
    }
})

module.exports = mongoose.model('Client', clientSchema);