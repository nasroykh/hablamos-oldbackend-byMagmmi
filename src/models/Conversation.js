const mongoose = require('mongoose')


const Conversation = mongoose.model('Conversation', {
    participants: [   
    { 
        type: String,
        required: false
    }

    ],
    MessagesID: [
        {
            type: String,
            required: false
        }
    ]


})
//STOP PLAYING AROUND 
module.exports = Conversation
