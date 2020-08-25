const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Account = require("../models/Account")


const encryptionKey = 'Nasro will soon quit algeria'

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')

    const accountID = jwt.verify(token, encryptionKey)
    console.log(accountID);
    const account = await Account.findById(accountID)
    req.account = account
    next()


}


module.exports.auth = auth