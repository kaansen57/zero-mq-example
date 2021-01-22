const zeromq = require('zeromq');

//Soket Türü
const socket = new zeromq.Publisher();


runPublisher();


async function runPublisher() {
    await socket.bind("tcp://127.0.0.1:9000");
    console.log("Bağlantı Kuruldu");
    console.log("Mesaj Formatı =  kanalAdi:Mesajınız");
    process.stdin.on("data",  async (data) => { //on ile habire bu process dinleniyor
        /*console.log("data",data.toString());  buffer gelen datayı string çevir ama bunun yerine backtick yazım versiyonununda
        bu sorun kalkıyor */
          const userMessage  = data.toString().replace("\n","");
          if(userMessage === "q"){
            process.exit(0);
        }
            if(userMessage.includes(":") && userMessage.split(":").length === 2){ // splitten dönen array uzunluğu 2 olmalı [1 kanaldi, 2mesaj]  
                 const dataSplit = userMessage.split(":");
                    await socket.send([dataSplit[0], dataSplit[1]]); // kanal oluştur ve mesajı gönder 
                   console.log("Data gönderildi!");
            }else{
                console.log("Yanlış Format \n Mesaj Formatı = kanalAdi:Mesajınız ");
            }
    });
}

// async function runPublisher() {
//     await socket.bind("tcp://127.0.0.1:9000");
//     console.log("Bağlantı Kuruldu");
//     process.stdin.once("data", async () => { //entera basınca 1 kere gönder
//         await socket.send(["topic1", "kaan şen"]); // kanal oluştur ve mesajı gönder 
//         console.log("Data gönderildi!");
//     });
// }