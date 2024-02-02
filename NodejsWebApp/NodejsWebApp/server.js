const zmq = require("zeromq");

async function main() {
    const brokerAddress = "tcp://*:3000";
    const socket = new zmq.Router();

    console.log(`Starting broker on ${brokerAddress}`);
    await socket.bind(brokerAddress);

    for await (const [clientId, , request] of socket) {
        console.log(`Received request from client ${clientId}: ${request.toString()}`);
        // Convert tu byte array sang struct
        if (isValidJSONString(request)) {
            const mystruct = byteArrayToStruct(request);
            // check clientId co phai la worker khong
            if (clientId.toString().includes("worker")) {
                // Neu clientID la worker, ban lai cho client
                const clientIdAgain = mystruct.clientId;
                await socket.send([clientIdAgain, "", request])
            }
            else {
                // Khong phai la worker thi ban cho worker
                const workerId = mystruct.workerId;
                await socket.send([workerId, "", request])
            }
        }
       

        //// Chuy?n ti?p yêu c?u t? client t?i worker
        //const workerReply = ["", workerId, ...request.slice(2)]; // Lo?i b? clientId, thêm workerId vào ph?n tr? l?i
        //await socket.send([workerId, "", ...workerReply]);

        //console.log(`Forwarded request to worker ${workerId}`);

        //// Nh?n k?t qu? t? worker và tr? l?i cho client
        //const [_, , clientIdAgain, , ...response] = await socket.receive();
        //await socket.send([clientIdAgain, "", ...response]);

        //console.log(`Sent response to client ${clientIdAgain}`);
    }
}

main().catch(console.error);


// Define your struct
const MyStruct = {
    clientId: '',
    workerId: '',
    index: 0,
    value: 0.0
};

// Function to convert struct to byte array
// Function to convert struct to byte array
function structToByteArray(struct) {
    const jsonString = JSON.stringify(struct);
    return Buffer.from(jsonString, 'utf-8');
}

// Function to convert byte array to struct
function byteArrayToStruct(bytes) {
    const jsonString = bytes.toString('utf-8');
    return JSON.parse(jsonString);
}

function isValidJSONString(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}
// Example usage
const originalStruct = {
    clientId: 'client1',
    workerId: 'worker1',
    index: 123,
    value: 45.67
};

