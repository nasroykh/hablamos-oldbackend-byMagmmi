const mongoose = require('mongoose')


const Profile = mongoose.model('Profile', {
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: false,
        trim: true,
    },
    lastName: {
        type: String,
        required: false,
        trim: true,

    },
    SecondsName: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    picture: {
        type: Buffer,
        required: false
    },
    birth_day: {
        type: String,
        required: false
    },
    conversations: [{
        ID: {
            type: String,
            required: true
        }
    }],
    sentInvitation: [{
        ID: {
        type: String,
        required: true
        }
    }],
    receivedInvitation: [{
        ID: {
        type: String,
        required: true
        }
    }],
    
    friends: [{
        ID: {
            type: String,
            required: true
        }
    }],
    friendsWithConversation: [{
        ID: {
            type: String,
            required: true
        }
    }],
    accountID: {
        
    },
    profilePicture: {
        type: Buffer,
        required: false
    }
})

module.exports = Profile

