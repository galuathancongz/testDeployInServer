const zmq = require('zeromq');

async function runServer() {
    const sock = new zmq.Router();

    // Bind Router t?i ??a ch? và c?ng
    await sock.bind('tcp://*:3000');

    console.log('Server is listening on port 5555');

    for await (const [clientId, empty, request] of sock) {
        console.log(`Received request from client ${clientId}: ${request}`);
        await sock.send([clientId, empty, request]);
    }
}

function getNextClientId(currentClientId) {
    // Trong ví d? này, chúng ta ??n gi?n ch? ??i ch? gi?a hai client
    return currentClientId === 'A' ? 'C' : 'A';
}

runServer();