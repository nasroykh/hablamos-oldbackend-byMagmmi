
const Account = require("../models/Account")
const Profile = require("../models/Profile")

const getFriends = async ( myProfileID ) => {
    console.log(myProfileID);
    try {

//      Store all profiles
        const myProfile = await Profile.findById(myProfileID)
//      If their is no profiles after filtering them
        if (myProfile.friends.length === 0) 
            return { status: 'Failure', reason: null, details: null, message: 'No friends found' };
        
        
        let friendsProfile = new Array()

        for (let i = 0; i < myProfile.friends.length; i++) {
            const friendProfile = await Profile.findById(myProfile.friends[i].ID)
            friendsProfile.push(friendProfile)
        }
        friendsProfile = await purifyFriends(friendsProfile)
        

//      Return Side
        return { status: 'Success', reason: 'reason', details: { friendsProfile }, message: 'Friends found' };

    } catch ( error ) {

//      Return Side
        return { status: 'Error', reason: null, details: error.toString(), message: 'Error during the proccess' };

    }

    

}
module.exports.getFriends = getFriends

const purifyFriends = async ( profiles ) => {

    //  Will Store purified profiles informations
        const purifiedProfiles = new Array()
    
    //  Loop through filtered profiles && add to (Array: purifiedProfiles) only needed information
        for (let i = 0; i < profiles.length; ++i) {
            purifiedProfiles.push({
                _id: profiles[i]._id,
                username: profiles[i].username,
                fullName: profiles[i].fullName
            })
        }
    
    //  Return side
        return purifiedProfiles;
    
    }