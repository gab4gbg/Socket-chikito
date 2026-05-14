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

  socket.emit("message", mensajes)

  socket.on("message", (message) => {

    const hora = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
    const nuevoMensaje = {
      ...message,
      hora
    }
    mensajes.push(nuevoMensaje)
    socket.emit("confirmation", "mensaje enviado")
    io.emit("message", mensajes)
  })
})

app.get("/", (req, res) => {
  res.send("hello world")
})

server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000")
})