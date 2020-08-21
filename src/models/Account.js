const mongoose = require('mongoose')



const Account = mongoose.model('Account', {
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        },
    }],
    webSocketID: {
            type: String,
            required: false
    },

    profile: {
        type: String,
        required: true
    }


})

module.exports = Account
