var socket = io()

//for to handle user
var params = new URLSearchParams(window.location.search)

//name and room is required
if (!params.has('name') || !params.has('room')) {
  // redirection
  window.location = 'index.html'
  throw new Error('The name and room are required')
}

var user = {
  name: params.get('name'),
  room: params.get('room'),
}

socket.on('connect', function () {
  console.log('Connected to server')

  //callback if accept
  socket.emit('enterChat', user, function (resp) {
    console.log('Users connected ', resp)
  })
})

// Listen
socket.on('disconnect', function () {
  console.log('We lost connection with the server')
})

// send information
// socket.emit(
//   'createMessage',
//   {
//     user: 'Alejandro Polak',
//     message: 'Hello World',
//   },
//   function (resp) {
//     console.log('server response: ', resp)
//   }
// )

// Listen information
socket.on('createMessage', function (message) {
  console.log('Server:', message)
})

//Listen change of users _> whwn user enter or get out of chat
socket.on('listPeople', function (people) {
  console.log(people)
})

//private messages (action)
socket.on('privateMessage', function (message) {
  console.log('Private message:', message)
})
