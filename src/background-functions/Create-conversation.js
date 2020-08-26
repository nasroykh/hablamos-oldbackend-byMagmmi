
const Account = require("../models/Account")
const Profile = require("../models/Profile")
const Message = require("../models/Message")
const Converstion = require("../models/Conversation")
const bcrypt = require('bcryptjs')
var colors = require('colors');

const isConversationAlreadyCreated = async (myProfile, hisProfile) => {
    for ( i = 0; i < myProfile.friendsWithConversation.length; i++) {
        if (myProfile.friendsWithConversation[i] == hisProfile._id) {
            return true
        }       

    };
}


const areFriends = async (myProfile, hisProfile) => {
    for ( i = 0; i < myProfile.friends.length; i++) {
        if (myProfile.friends[i] == hisProfile._id) {
            return true
        }       

    };
}


const updateProfiles = async (myProfile, hisProfile, conversationID) => {

    myProfile.friendsWithConversation =  myProfile.friendsWithConversation.concat(hisProfile._id)
    hisProfile.friendsWithConversation =  hisProfile.friendsWithConversation.concat(myProfile._id)

    myProfile.conversations =  myProfile.conversations.concat(conversationID)
    hisProfile.conversations =  hisProfile.conversations.concat(conversationID)

    myProfile.save()
    hisProfile.save()
}
/**
 * 
 * @param {*} participants 
 * I AM TIRED OF COMMENTS "createConversation"
 */
const openConversation = async ( myProfileID, hisProfileID ) => {
    
    try {

        const myProfile = await Profile.findById(myProfileID);
        const hisProfile = await Profile.findById(hisProfileID);

        if (await isConversationAlreadyCreated(myProfile, hisProfile)) {

            const {messagesID, conversationID} = await getMessagesID(myProfile, hisProfile)
            const messages = await Message.find( {_id: messagesID } )
            return { status: 'Success', reason: null, details: {messages, conversationID}, message: 'Conversation Opened' }

        }
        
        if (!await areFriends(myProfile, hisProfile))
            return { status: 'Failure', reason: null, details: null, message: 'You are not friend with this user' }
        

//      Store a new {mongooseObject: Conversation} with provided participants
        const conversation = new Converstion( { participants: [ myProfile._id, hisProfile._id ] } )

        updateProfiles(myProfile, hisProfile, conversation._id)

//      Save the conversation
        await conversation.save()


        const {messagesID, conversationID} = await getMessagesID(myProfile, hisProfile)
        const messages = await Message.find( {_id: messagesID } )
        return { status: 'Success', reason: null, details: messages, message: 'Conversation Created' }

    } catch (error) {

//      Return
        return { status: 'Error', reason: null, details: error, message: 'Error during the process' }

    }

    

}

const getMessagesID = async (myProfile, hisProfile) => {
    let conversation = await Converstion.findOne( { participants : [ myProfile._id, hisProfile._id ] }) 
    if (conversation == null || conversation == undefined || conversation.length == 0) {
        conversation = await Converstion.findOne( { participants : [ hisProfile._id, myProfile._id] })
    }

    return {messagesID: conversation.MessagesID, conversationID: conversation._id}
}

const getMessages = async (conversation) => {
    const messagesID = conversations.MessagesID
}



const getConversations = async (myProfileID) => {
    try {
        // const myProfile = await Profile.findById(myProfileID);
        // console.log("myProfile: ", myProfile);
        // const profilesID = myProfile.friendsWithConversation
        // console.log("profilesID: ", profilesID);
        // const profiles = new Array()


        
        // for (let i = 0; i < profilesID.length; ++i) {
        //     const profile = await Profile.findById( profilesID[i].ID )
        //     console.log("profile: ", profile);

        //     profiles.push(profile)
        // }

        // const purifiedProfiles = new Array()

        // for (let i = 0; i < profiles.length; ++i) {

        //     purifiedProfiles.push({ _id: profiles[i]._id, username: profiles[i].username, fullName: profiles[i].fullName })
        // }
        // return { status: 'Success', reason: null, details: purifiedProfiles, message: 'Conversation Fetched' }


        const myProfile = await Profile.findById(myProfileID);
        const conversationsID = myProfile.conversations
        const conversations = new Array ()
        for (let i = 0; i < conversationsID.length; i++){
            const conversation = await Converstion.findById(conversationsID[i])
            conversations.push(conversation)
        }
        
        const purifiedInfo = new Array ()
        for (let i = 0; i < conversations.length; ++i) {
            for (let j = 0; j < conversations[i].participants.length; ++j) {
            
                
                if (conversations[i].participants[j] != myProfileID) {
                    const profileID = conversations[i].participants[j]
                    const messageSize = conversations[i].MessagesID.length
                    const lastMessageID = conversations[i].MessagesID[messageSize - 1]
                    const lastMessage = await Message.findById(lastMessageID)
                    const profile = await Profile.findById(profileID)
       
                    purifiedInfo.push( {_id: profile._id, username: profile.username, fullName: profile.fullName, lastMessage } )
                    
                }
            }

        }
        return { status: 'Success', reason: null, details: purifiedInfo, message: 'Conversation Fetched' }


    } catch (error) {
        return { status: 'Error', reason: null, details: error.toString(), message: 'Error during the process' }
        
    }

    
}


module.exports.openConversation = openConversation
module.exports.getConversations = getConversations









// /* Return the size of an object */
// Object.size = function(obj) {
//     var size = 0, key;
//     for (key in obj) {
//         if (obj.hasOwnProperty(key)) size++;
//     }
//     return size;
// };



// const conversationAlreadyExist = async ( profiles ) => {
//     //  Loop through profiles && Add the new ConversationID to their { Array: Conversation } && Save Them
//         for ( i = 0; i < profiles[0].friendsWithConversation.length; i++) {
//             console.log('profiles[0].friendsWithConversation[i].ID: ', profiles[0].friendsWithConversation[i].ID);
//             console.log('profiles[1]._id: ', profiles[1]._id);
//             if (profiles[0].friendsWithConversation[i].ID == profiles[1]._id) {
//                 return true
//             }       

   
//         };
//     }



//     /**
//  * 
//  * @param {*} participants 
//  * @returns
//  * Return an array that contains all participants profile
//  */
// const getParticipantsProfile = async ( participants ) => {

//     let profiles = new Array()

//     for (let i = 0; i < participants.length; i++) {
        
//         const profile =  await Profile.findOne( { _id: participants[i].ID } )

//         profiles.push(profile)

//     }

//     return profiles;

// }

// /**
//  * 
//  * @param {*} profiles 
//  * Add to participants profile the new conversation ID
//  */
// const updateProfiles = async ( profiles, conversation) => {

//     profiles[0].friendsWithConversation =  profiles[0].friendsWithConversation.concat({ID: profiles[1]._id})
//     profiles[1].friendsWithConversation =  profiles[1].friendsWithConversation.concat({ID: profiles[0]._id})
    
// //  Loop through profiles && Add the new ConversationID to their { Array: Conversation } && Save Them
//     for ( i = 0; i < profiles.length; i++) {
//         profiles[i].conversations = profiles[i].conversations.concat({ID:conversation._id})
//         await profiles[i].save()
//     };

// }