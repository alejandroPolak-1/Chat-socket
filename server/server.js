const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const path = require('path')

const app = express()
let server = http.createServer(app)

const publicPath = path.resolve(__dirname, '../public')
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

// IO = this is the backend communication

let io = socketIO(server)

io.on('connection', (client) => {
  console.log('Connected user')

  client.emit('sendMessage', {
    usuario: 'Admin',
    mensaje: 'Welcome to this app',
  })

  client.on('disconnect', () => {
    console.log('Disconnected user')
  })

  // Listen to client
  client.on('sendMessage', (data, callback) => {
    console.log(data)

    if (data.user) {
      callback({
        resp: 'All went well!',
      })
    } else {
      callback({
        resp: 'Everything went wrong!!!!!!!!',
      })
    }
  })
})

server.listen(port, (err) => {
  if (err) throw new Error(err)

  console.log(`Server run in port ${port}`)
})
