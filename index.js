require('./src/database/mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const accountRouters = require('./src/routers/Accounts');
const conversationRouters = require('./src/routers/Conversation');
const friendRouters = require('./src/routers/Friends');
const {addPeer, removePeer, getNumberOfPeerConnected } = require('./src/background-classes/webSocket-Connected-Peers');

const util = require('util')
const router = new express.Router()
//dd

const server = app.listen(process.env.PORT || 4444);
const io = require('socket.io')(server);


router.post('/connect', async function (req, res) {
    try {

//      Procced to inscription
        console.log(req.body);

//      If no error is throwed during inscription we send Success && ... 
        // res.send({ 
        //     Status: status, 
        //     Reason: reason, 
        //     Details: details, 
        //     Message: message
        // })

    } catch (error) {
        console.log(error);
//      If their is a throwen error we send it to the client
        res.send({ 
            Status: status, 
            Reason: reason, 
            Details: error, 
            Message: message
        })


    }
})



io.sockets.on('connection', ( socket ) => {

    console.log("We have a new client: " + socket.id);
    socket.emit('connected', socket.id);

    addPeer(socket)
    
    socket.on('disconnect', () => {
        removePeer(socket)
   
      
    });

  }
);

console.log("Connected Yeah : Port 4444");

app.use(express.json())
app.use(router)
app.use(accountRouters)
app.use(friendRouters)
app.use(conversationRouters)















// const server = app.listen(process.env.PORT || 4444, listen);

// function listen() {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log('Example app listening at http://' + host + ':' + port);
// }
  