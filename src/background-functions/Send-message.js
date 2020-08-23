
const Account = require("../models/Account")
const Profile = require("../models/Profile")
const Conversation = require("../models/Conversation")
const Message = require("../models/Message")
const bcrypt = require('bcryptjs')
const { addPeer, removePeer, getPeer_BySocketID } = require('../background-classes/webSocket-Connected-Peers')


const sendMessage = async ( message, senderID, conversationID ) => {
    
    try {
        sender = await Profile.findById(senderID)
 
        var newMessage 
        const conversation = await Conversation.findById( conversationID )

        newMessage = new Message( { message: message, sentFrom: { ID: sender._id, username: sender.username } } )
        await newMessage.save()
        conversation.MessagesID = conversation.MessagesID.concat(newMessage._id)
        await conversation.save()

        const profilesID = conversation.participants
        // const profiles = new Array()
        for (let i = 0; i < profilesID.length; i++) {
            const account = await Account.findOne({profile: profilesID[i]})
            if (account.webSocketID != undefined) {
                console.log(account.webSocketID);
                await getPeer_BySocketID(account.webSocketID).emit('sendMessage', conversationID, newMessage)
            }
        }
        return { status: 'Success', reason: 'reason', details: { newMessage }, message: 'Friends found' };

        
    } catch (error) {
        console.log(error);
    }
    
}


const sendMessageOLD = async ( message, senderID, conversationID ) => {
    try {
        sender = await Profile.findById(senderID)
        console.log(-1);
    
        console.log(0);
        var newMessage 
        const conversation = await Conversation.findById( conversationID )


        const oldtime = getTime()
        for (j = 0; j < 2; ++j){
            newMessage = new Message( { message: message, sentFrom: { ID: sender._id, username: sender.username } } )
    
            await newMessage.save()
            // conversation.MessagesID =  conversation.MessagesID.concat(newMessage._id)
            // await conversation.save()
            console.log(newMessage);
            console.log(j);


    
        }

        const newTime = getTime()



        console.log(1);
    
    
    
        console.log(2);
        console.log(conversation);
        console.log(3);
        console.log(newMessage._id);
    
        // console.log(conversation.participants[0]._id);
        // const socketID = await Account.findById('5f31088788400fdc3764448b')
        // console.log(4);
        // // console.log(socketID);
        // const i = socketID.webSocketIDs[socketID.webSocketIDs.length - 1].webSocketID
        // console.log(5);
        // // console.log(socketID.webSocketIDs[socketID.webSocketIDs.length - 1].webSocketID);
        // const so = getPeer_BySocketID(i)
        // console.log(6);
    
        // // console.log(so);
        // so.emit('message-sent', message)
    
        console.log(oldtime);
        console.log(newTime);
    } catch (error) {
        console.log(error);
    }
    
}


const getTime = async () => {
    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds

}
module.exports.sendMessage = sendMessage