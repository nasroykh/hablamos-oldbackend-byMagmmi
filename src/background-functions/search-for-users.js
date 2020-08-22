
const Account = require("../models/Account")
const Profile = require("../models/Profile")

const searchForUsers = async ( fragmentWords ) => {

    try {

//      Store all profiles
        const profiles = await Profile.find()

//      Store filtered profiles by username or fullname
        const filteredProfiles = await filterProfiles(profiles, fragmentWords)

//      If their is no profiles after filtering them
        if (filteredProfiles.length === 0)
            return { status: 'Failure', reason: null, details: null, message: 'No users found' };
        
//      Purify the filtered profiles
        const purifiedProfiles = await purifyProfiles(filteredProfiles)

//      Return Side
        return { status: 'Success', reason: 'reason', details: { purifiedProfiles }, message: 'Users found' };

    } catch ( error ) {

//      Return Side
        return { status: 'Error', reason: null, details: error.toString(), message: 'Error during the proccess' };

    }

    

}


const purifyProfiles = async ( filteredProfiles ) => {

//  Will Store purified profiles informations
    const purifiedProfiles = new Array()

//  Loop through filtered profiles && add to (Array: purifiedProfiles) only needed information
    for (let i = 0; i < filteredProfiles.length; ++i) {
        purifiedProfiles.push({
            _id: filteredProfiles[i]._id,
            username: filteredProfiles[i].username,
            fullName: filteredProfiles[i].fullName
        })
    }

//  Return side
    return purifiedProfiles;

}




const filterProfiles = async (profiles, fragmentWords) => {

//  Will Store filtered profiles
    const filteredProfiles = new Array()

//  Loop through profiles && Check if username or fullname includes (variable: fragmentWords) && add the profile to (Array: filteredProfiles)
    for (let i = 0; i < profiles.length; ++i) {
        if (profiles[i].username.toLowerCase().includes(fragmentWords) || profiles[i].fullName.toLowerCase().includes(fragmentWords))
            filteredProfiles.push(profiles[i]);
        
    }
    
//  Return side
    return filteredProfiles
    
}





module.exports.searchForUsers = searchForUsers