const {io} = require('../server')

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
