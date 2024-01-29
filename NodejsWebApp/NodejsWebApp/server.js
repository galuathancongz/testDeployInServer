const zmq = require('zeromq');

async function runServer() {
    const sock = new zmq.Router();

    await sock.bind('tcp://*:3000');

    console.log('Server is listening on port 3000');

    for await (const [clientId,empty,request] of sock) {
        //if (request !== undefined) {
        //    const messageContent = request.toString('utf8');
        //    console.log('Received message content:', messageContent);
        //} else {
        //    console.log('Empty message received!');
        //}
        await sock.send([clientId, empty, request]);
    }
}

function getNextClientId(currentClientId) {
    return currentClientId === 'A' ? 'C' : 'A';
}

runServer();