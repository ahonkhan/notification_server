const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
    console.log(`a user connected ${socket.id}`);

    socket.on("send_message", (data) => {
        console.log(data)
        socket.emit("receive_message", data);
    });

    socket.on("notificationAccepted",()=>{

        setInterval(()=>{
            const content = {
                title:"Hi brother",
                message:"How are you?"
            }
            socket.emit("notificationSend",content)
        },1000*60)
    })


});


server.listen(4000, () => {
    console.log("listening on *:4000");
});