const Account = require("../models/Account")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Profile = require("../models/Profile");


const checkAuth = async (account) => {
    try {
        const profile = await Profile.findById(account.profile)
        return { status: 'Success', reason: 'reason', details: { account, myID: profile._id, myFullName: profile.fullName, token, mySocketID }
        , message: 'Auto Load' };


    } catch (error) {
        return { status: 'Failure', reason: null, details: null, message: 'Login in failed' };

    }

}



module.exports.checkAuth = checkAuth
