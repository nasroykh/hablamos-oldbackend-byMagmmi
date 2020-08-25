const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Account = require("../models/Account")


const encryptionKey = 'Nasro will soon quit algeria'

const auth = async (req, res, next) => {

    try {

        const token = req.header('Authorization')
        const webSocketID = req.header('webSocketID')

        const accountID = jwt.verify(token, encryptionKey)
        const account = await Account.findById(accountID)

        if(account == null) {
            throw new Error()
        }

        req.account = account

        if (account.webSocketID != webSocketID) {
            account.webSocketID = webSocketID
            await account.save()
        }

        next()
    } catch (error) {
        res.send({ error: 'Please log in.' })
    }



}


module.exports.auth = auth