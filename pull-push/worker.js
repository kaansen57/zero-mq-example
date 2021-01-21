const zeromq = require('zeromq');


//Socket Türü
const socket  = new zeromq.Pull();

runWorker();

async function runWorker() {
   await socket.connect("tcp://127.0.0.1:9000");

    for await (const message of socket){
        console.log(`Gelen mesaj : ${message}`);
    }
}
