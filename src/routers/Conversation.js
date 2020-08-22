const express = require('express')
const router = new express.Router()
const { openConversation, getConversations } = require('../background-functions/Create-conversation')
const { sendMessage } = require('../background-functions/Send-message')

// Status: 'Success', Reason: '.......', Details: '.....', Message: '......'
// Status: 'Failure', Reason: '.......', Details: '.....', Message: '......'
// Status: 'Error', Reason: '.......', Details: '.....', Message: '......'

router.post('/openConversation', async function (req, res) {
    console.log(req.body);
//  We store returned values from the createConversation function
    const { status, reason, details, message } = await openConversation(req.body.myProfileID, req.body.hisProfileID)
    
//  We send those values to the client IF their is not error throwen during the logIn() process
    res.send({ 
        Status: status, 
        Reason: reason, 
        Details: details, 
        Message: message
    });
        
})

router.post('/sendMessage', async function (req, res) {

    try {
        const { status, reason, details, message } = await sendMessage(req.body.message, req.body.senderID, req.body.conversationID)
        res.send({ 
            Status: status, 
            Reason: reason, 
            Details: details, 
            Message: message
        });

    } catch (error) {
        res.send(error)


    }

})

router.post('/fetchConversation', async function (req, res) {
  
        const { status, reason, details, message } =  await getConversations(req.body.myProfileID)
    res.send({ 
        Status: status, 
        Reason: reason, 
        Details: details, 
        Message: message
    });

})





module.exports = router
