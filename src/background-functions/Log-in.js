
const Account = require("../models/Account")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Profile = require("../models/Profile");


const logIn = async ( email, password, mySocketID ) => {

    try {
        
//      Find an account who use the same provided email
        const account = await Account.findOne({ email });

//      If their is no account with the email provided
        if (account === null) 
            return { status: 'Failure', reason: null, details: null, message: 'Account not found' }
        
//      We store true if the password provided matches the account password. Otherwise return false
        const passwordMatch = await bcrypt.compare(password, account.password)

//      If the password provided matches the password of the account
        if (passwordMatch) {

//          We store the generated token
            const token = await generateAuthToken(account._id);

//          Add this token to the account tokens
            account.tokens = account.tokens.concat(token);
            
//          Add the received webSocketID to the webSocketIDs
            account.webSocketID = mySocketID;

//          Update account
            await account.save();

            const profile = await Profile.findById(account.profile)
            
//          RETURN SIDE
            return { status: 'Success', reason: 'reason', details: { account, myID: profile._id, myFullName: profile.fullName, token, mySocketID }, message: 'Information match an account' };

        }

//      If not
        else 
            return { status: 'Failure', reason: null, details: null, message: 'Password Incorrect' };

    } catch (error) {
        return { status: 'Error', reason: null, details: error.toString(), message: 'Error during the proccess' };
    }

}

const generateAuthToken = async ( _id ) => {
    return jwt.sign( { _id }, 'Nasro will soon quit algeria', { expiresIn: "1000 s" }  )
}

module.exports.logIn = logIn;
