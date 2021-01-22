const zeromq = require('zeromq');

const socket = new zeromq.Subscriber();

runSubscriber();

async function runSubscriber(){
    await socket.connect("tcp://127.0.0.1:9000");
    console.log("Servise bağlanıldı ! ");
    await socket.subscribe("topic1");
    console.log("Kanala abone olundu !");
    
    for await (const[topic,message] of socket){
        console.log(`Kanal :${topic} , Mesaj : ${message}`);
    }
}