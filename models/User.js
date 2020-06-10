const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dest: {
        type: String,
        default: null
    },
    source: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: null
    },

    email: {
        type: String,
        default: null
    }

})

module.exports = mongoose.model('User', User);