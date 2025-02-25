const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

// Ruta unde NodeMCU va trimite request-uri
app.post("/api/data", (req, res) => {
    const requestData = req.body;
    console.log("Request primit de la NodeMCU:", requestData);

    // Trimite datele către clientul Web prin WebSocket
    io.emit("new_request", requestData);
    
    res.status(200).json({ message: "Request primit!" });
});

// Servirea paginii web<a href="index.html" title="index"></a>
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// WebSocket pentru a trimite request-urile live
io.on("connection", (socket) => {
    console.log("Client conectat la WebSocket");
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
