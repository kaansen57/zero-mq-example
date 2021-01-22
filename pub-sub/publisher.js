const zeromq = require('zeromq');

//Soket Türü
const socket = new zeromq.Publisher();

runPublisher();

async function runPublisher() {
    await socket.bind("tcp://127.0.0.1:9000");
    console.log("Bağlantı Kuruldu");
    process.stdin.once("data", async () => {
        await socket.send(["topic1", "kaan şen"]); // kanal oluştur ve mesajı gönder 
        await socket.send(["topic1", "kaan şen"]); // kanal oluştur ve mesajı gönder 
        console.log("Data gönderildi!");
    });
}