const zmq = require("zeromq");

async function main() {
    const brokerAddress = "tcp://*:3000";
    const socket = new zmq.Router();

    console.log(`Starting broker on ${brokerAddress}`);
    await socket.bind(brokerAddress);

    for await (const [clientId,, request] of socket) {
        console.log(`Received request from client ${clientId}`);
        // Convert tu byte array sang struct
        if (isValidJSONString(request)) {
            const data = byteArrayToStruct(request);

            if (data.hasOwnProperty("clientId") && data.hasOwnProperty("workerId")) {
                if (clientId.toString().includes("worker")) {
                    const clientIdAgain = data.clientId;
                    await socket.send([clientIdAgain, "", request]);
                } else {
                    const workerId = data.workerId;
                    await socket.send([workerId, "", request]);
                }
            } else {
                console.log(`Du lieu khong phai struct MyStruct`);
                const errorMessage = "Du lieu khong phai";
                await socket.send([clientId, "", errorMessage]);
            }
        }
        else
        {
            console.log(`Du lieu khong phai struct`);
            const errorMessage = "Du lieu khong hop le";
            await socket.send([clientId, "", errorMessage]);
        }
       
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

