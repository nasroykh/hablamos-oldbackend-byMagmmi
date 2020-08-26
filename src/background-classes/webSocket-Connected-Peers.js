


var connectedPeers = new Array()


const addPeer = (webSocket) => {
    connectedPeers.push(webSocket)
}

const removePeer = (socket) => {
    for ( i = 0; i < connectedPeers.length; ++i){
        if (connectedPeers[i] === socket) {

            connectedPeers.splice(connectedPeers.length, 1)

        }
    }
      
}

const removePeer_byIndex = (index) => {
    connectedPeers.splice(index, 1)
}

const getNumberOfPeerConnected = () => {
    return connectedPeers.length
}


const getPeer_BySocketID = (socketID) => {


    for ( i = 0; i < connectedPeers.length; ++i){
        if (connectedPeers[i].id === socketID){

            return connectedPeers[i]
        }
    }
    return null
}





module.exports.addPeer = addPeer
module.exports.getNumberOfPeerConnected = getNumberOfPeerConnected
module.exports.removePeer = removePeer
module.exports.getPeer_BySocketID = getPeer_BySocketID
