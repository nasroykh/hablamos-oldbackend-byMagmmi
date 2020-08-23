
const Account = require("../models/Account")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Profile = require("../models/Profile");


const logOut = async ( account ) => {

    try {
        account.webSocketID = undefined
        account.save()

    } catch (error) {
        return { status: 'Error', reason: null, details: error.toString(), message: 'Error during the proccess' };
    }

}

const generateAuthToken = async ( _id ) => {
    return jwt.sign( { _id }, 'Nasro will soon quit algeria', { expiresIn: "10 s" }  )
}

module.exports.logOut = logOut;
