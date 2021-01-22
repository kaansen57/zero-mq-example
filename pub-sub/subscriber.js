const zeromq = require('zeromq');

const socket = new zeromq.Subscriber();
const topicName  = process.argv[2] || "kaansen" // değer yoksa default olarak kaansen topicine bağlan.
runSubscriber();

async function runSubscriber(){
    await socket.connect("tcp://127.0.0.1:9000");
    console.log("Servise bağlanıldı ! ");
    await socket.subscribe(topicName);
    console.log(`${topicName} Kanalına abone olundu !`);
    
    for await (const[topic,message] of socket){
        console.log(`Kanal :${topic} , Mesaj : ${message}`);
    }
}