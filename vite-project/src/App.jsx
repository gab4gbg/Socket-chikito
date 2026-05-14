import { useEffect, useState } from "react"
import { io } from "socket.io-client"

function App() {
  const [socket, setSocket] = useState()
  const [inputMessage, setInputMessage] = useState()
  const [mensajesRecibidos, setMensajeRecibido] = useState([])
  const [user, setUser] = useState("")

  useEffect( () => {
    const newSocket = io("http://192.168.1.12:3000")
    setSocket(newSocket)

    newSocket.on("message", (message) => {
      setMensajeRecibido(message)
    })

    setUser(prompt("Ingrese su nombre"))

    return () => {
      newSocket.disconnect()
    }
  }, [] )

  const handleSubmit = (e) => {
    e.preventDefault()
    if(socket) 
      {
      socket.emit("message", { user, inputMessage })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Escribe el mensaje"
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <ul>
        {
          mensajesRecibidos.map(mensaje => <li>{mensaje.hora} {mensaje.user}: {mensaje.inputMessage}</li>)
        }
      </ul>
    </div>
  )
}

export default App