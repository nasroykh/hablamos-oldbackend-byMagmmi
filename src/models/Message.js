const mongoose = require('mongoose')


const Message = mongoose.model('Message', {
    message: {
        type: String,
        required: true,
        trim: true,
    },
    sentFrom: {

        ID: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        }

    },
    sentAt: {
        type: String,
        required: false
    }
    // sentTo: {

    //     ID: {
    //         type: String,
    //         required: true
    //     },
    //     username: {
    //         type: String,
    //         required: true
    //     }
    // },
    // senderUsername: {
    //     type: String,
    //     required: true
    // },
})

module.exports = Message
