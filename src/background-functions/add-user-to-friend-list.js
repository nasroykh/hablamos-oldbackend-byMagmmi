
const Profile = require("../models/Profile")
const Account = require("../models/Account")
const { addPeer, removePeer, getPeer_BySocketID } = require('../background-classes/webSocket-Connected-Peers')


const sendInvitation = async (myProfileID, hisProfileID ) => {
    try {

        me = await Profile.findOne( { _id: myProfileID } )
        his = await Profile.findOne( { _id: hisProfileID } )
 
        if (me === null || his === null) 
            return { status: 'Failure', reason: null, details: null, message: 'ID provided are invalide' };


//      Loop through (array: me friends) && Check if the two Users are already friends
        for (var i = 0; i < me.friends.length; ++i){
            if (me.friends[i] === hisProfileID) 
                return { status: 'Failure', reason: null, details: null, message: 'Users are already friends' };

        }


        for (var i = 0; i < me.sentInvitation.length; ++i){

            if (me.sentInvitation[i] == his._id) {
                return { status: 'Failure', reason: null, details: null, message: 'Users are already invited' };

            }
        }

        const myAccount = await Account.findOne( { profile: myProfileID } )
        const hisAccount = await Account.findOne( { profile: hisProfileID } )
        console.log('myAccount.webSocketID: ', myAccount.webSocketID);
        console.log(hisAccount.webSocketID);


        // if (hisAccount.webSocketID != undefined) {
        //     console.log(hisAccount.webSocketID);
        //     await getPeer_BySocketID(hisAccount.webSocketID).emit('notif')
        // }


//      Add 'his' to 'me' friend`s list && Add 'me' to 'his' friend`s
        me.sentInvitation = me.sentInvitation.concat(his._id)
        his.receivedInvitation = his.receivedInvitation.concat(me._id)
    
//      Update 'me' && 'his' Profile
        await me.save()
        await his.save()

        return { status: 'Success', reason: 'reason', details: true,  message: 'Invitation sent' };


    } catch ( error ) {
        return { status: 'Error', reason: null, details: error.toString(), message: 'Error during the proccess' };

    }


}


const addFriend = async (myProfileID, hisProfileID ) => {
    try {
        if (myProfileID === null || myProfileID === undefined || myProfileID === '' || hisProfileID === null || hisProfileID === undefined || hisProfileID === '') {
            return { status: 'Failure', reason: null, details: null, message: 'Please provide ID' };

        }
        me = await Profile.findOne( { _id: myProfileID } )
        his = await Profile.findOne( { _id: hisProfileID } )
        // console.log(me);
        // console.log(his);
        if (me === null || his === null) 
            return { status: 'Failure', reason: null, details: null, message: 'ID provided are invalide' };
        let isInvited = false
        for (var i = 0; i < his.sentInvitation.length; ++i){
            if (his.sentInvitation[i] == me._id) {
                his.sentInvitation.splice(i, 1)
                isInvited = true
                break;
            }
        }
        

        for (var i = 0; i < me.receivedInvitation.length; ++i){
            if (me.receivedInvitation[i] == his._id) {
                me.receivedInvitation.splice(i, 1)
                isInvited = true
                break;
            }
        }

        if (!isInvited){
            return { status: 'Failure', reason: null, details: null, message: 'no invitation' };
        }

        const myAccount = await Account.findOne( { profile: myProfileID } )
        const hisProfile = await Account.findOne( { profile: hisProfileID } )


        console.log('hisProfile.webSocketID: ', hisProfile.webSocketID);
        if (hisProfile.webSocketID != undefined) {
            console.log(hisProfile.webSocketID);
            await getPeer_BySocketID(hisProfile.webSocketID).emit('notif')
        }

//      Add 'his' to 'me' friend`s list && Add 'me' to 'his' friend`s
        me.friends = me.friends.concat(his._id)
        his.friends = his.friends.concat(me._id)
    
//      Update 'me' && 'his' Profile
        await me.save()
        await his.save()

        return { status: 'Success', reason: 'reason', details: true, message: 'Friend added to friend list' };


    } catch ( error ) {
        return { status: 'Error', reason: null, details: error.toString(), message: 'Error during the proccess' };

    }


}



const removeFriend = async (myProfileID, hisProfileID ) => {
    try {

        me = await Profile.findOne( { _id: myProfileID } )
        his = await Profile.findOne( { _id: hisProfileID } )
 
        if (me === null || his === null) 
            return { status: 'Error', reason: null, details: null, message: 'ID provided are invalide' };

        const friendshipStatus = await areFriends(me, hisProfileID)

        if (!friendshipStatus) {
            return { status: 'Failure', reason: null, details: null, message: 'Users are not friends' };
        }

//      Delete 'me' from 'his' friend list && Delete 'his' from 'me' list
        for (var i = 0; i < me.friends.length; ++i){

            if (me.friends[i].ID === hisProfileID) 
                me.friends.splice(i, 1);

            if (his.friends[i].ID === myProfileID) 
                me.friends.splice(i, 1);
                
        }
        

//      Update 'me' && 'his' Profile
        await me.save()
        await his.save()

        return { status: 'Success', reason: 'reason', details: { me }, message: 'Friend removed to friend list' };


    } catch ( error ) {
        return { status: 'Error', reason: null, details: error.toString(), message: 'Error during the proccess' };

    }


}


const areFriends = async (me, hisProfileID) => {
    let status = false 
//  Loop through (array: me friends) && Check if the two Users are already friends
    for (var i = 0; i < me.friends.length; ++i){
        if (me.friends[i].ID !== hisProfileID ) 
            status = false
        else {
            status = true
            break;
        }
    }
    return status
}





module.exports.addFriend = addFriend
module.exports.removeFriend = removeFriend
module.exports.sendInvitation = sendInvitation


