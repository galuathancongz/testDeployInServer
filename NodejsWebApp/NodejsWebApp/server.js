const zmq = require('zeromq');

async function runQueue() {
    const queue = new zmq.Dealer();

    // Bind queue to listen for incoming requests from clients
    await queue.bind('tcp://*:3000');
    console.log('Queue is listening on port 5555');

    while (true) {
        // Receive request from client
        const request = await queue.receive();

        console.log('Received response:');

        // Forward the request to the next stage (Worker)
        await queue.send(request);

        console.log('Received response:');
    }
}

runQueue().catch((err) => console.error('Error in Queue:', err));