var socket = io()

socket.on('connect', function () {
  console.log('Connected to server')
})

// escuchar
socket.on('disconnect', function () {
  console.log('We lost connection with the server')
})

// send information
socket.emit(
  'sendMessage',
  {
    user: 'Alejandro Polak',
    message: 'Hello World',
  },
  function (resp) {
    console.log('server response: ', resp)
  }
)

// Escuchar información
socket.on('sendMessage', function (message) {
  console.log('Server:', message)
})
