
const Account = require("../models/Account")
const Profile = require("../models/Profile")
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer");




const sendEmail = async () => {
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "magmmi@outlook.com", // generated ethereal user
        pass: "NOO48jm5!5EU$K50H8Wgsr#sTqPvZLD^s0Ple%Yo8Jq^p2$e!uBXTU", // generated ethereal password
      },
      tls: {
        ciphers:'SSLv3'
    }
    });
    
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" magmmi@outlook.com', // sender address
      to: "magmmi.pl@outlook.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world? \n ffffffffffffffffffffffffffffffffffffffffffffffffffffff", // plain text body
      html: "<p>Hello world? </p>", // html body
    });

    console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}




/**
 * 
 * @param {*} profileInformation 
 * Main function of inscription
 */
const signUp = async ( profileInformation, accountInformation ) => {
  console.log(accountInformation);
  console.log(profileInformation);
    try {
        if (profileInformation.username === "" || profileInformation.username === undefined) {
          const emailIndex = accountInformation.email.search('@')
          profileInformation.username = accountInformation.email.substr(0, emailIndex)
      }
        // profileInformation.usernamee = accountInformation.email
    
        //  Store true if their is an account who use the email provided. Otherwise return false
        const accountExist = await Account.exists( { email: accountInformation.email } );

        //  If their is an account who is the email provided
            if (accountExist) 
                return { status: 'Failure', reason: null, details: null, message: 'Email already used' };
            
        //  If not
            else {

        //      Create a profile for user
                const profile = await createProfile( profileInformation );

        //      Save the profile
                await profile.save();
            
        //      Create a account using the created profileID like a reference
                const account = new Account( { 
                    email: accountInformation.email,
                    password: await bcrypt.hash(accountInformation.password, 8),
                    profile: profile._id
                } );

        //      Save the account
                await account.save();
                sendEmail()
                return { status: 'Success', reason: 'reason', details: { account, profile }, message: 'Account created' }

            }
            
        } catch (error) {

            return { status: 'Error', reason: null, details: error.toString(), message: 'Error during the proccess' };

    }

}

/**
 * 
 * @param {*} profileInformation 
 * Create a profile mode
 * 'Details': { 
 *              We use it to create an account,
 *              Account is the main class and it has different second classes like Profile, messages, posts ...
 *            }
 *              
 */
const createProfile = async ( profileInformation ) => {
    return new Profile( profileInformation )
}




/**
 * 
 * @param {*} profileInformation 
 * Create a profile mode
 * 'Details': { 
 *              We use it to create an account,
 *              Account is the main class and it has different second classes like Profile, messages, posts ...
 *            }
 *              
 */
const uploadProfilePicture = async ( profileID, buffer ) => {
    try {
      const profile = await Profile.findById(profileID);
      profile.profilePicture = buffer
      await profile.save()

      return { status: 'Success', reason: 'reason', details: { profile }, message: 'Account created' }

    } catch (error) {

      return { status: 'Error', reason: null, details: error.toString(), message: 'Error during the proccess' };

    }


}



module.exports.signUp = signUp
module.exports.uploadProfilePicture = uploadProfilePicture