import { useEffect, useState } from "react"
import { io } from "socket.io-client"

function App() {
  const [socket, setSocket] = useState()
  const [inputMessage, setInputMessage] = useState()

  useEffect( () => {
    const newSocket = io("localhost:3000")
    setSocket(newSocket)
    return () => {
      newSocket.disconnect()
    }
  }, [] )

  const handleSubmit = (e) => {
    e.preventDefault()
    if(socket) {
      socket.emit("message", inputMessage)
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
    </div>
  )
}

export default App