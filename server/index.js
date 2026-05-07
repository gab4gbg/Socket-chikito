const express = require("express")
const { createServer } = require("node:http")
const { Server } = require("socket.io")
const cors = require("cors")

const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

const mensajes = []
io.on("connection", (socket) => {
  console.log("usuario conectado")

  socket.emit("message", ["holi"])

  socket.on("message", (message) => {
    mensajes.push(message)
    socket.emit("confirmation", "mensaje enviado")
    socket.broadcast.emit("message", mensajes)
  })
})

app.get("/", (req, res) => {
  res.send("hello world")
})

server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000")
})