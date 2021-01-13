const {io} = require('../server')
const {Users} = require('../classes/users')
const {createMessage} = require('../utilities/utilities')

const users = new Users()

io.on('connection', (client) => {
  client.on('enterChat', (data, callback) => {
    if (!data.name || !data.room) {
      return callback({
        error: true,
        message: 'The name and room are required',
      })
    }

    //for user joins room
    client.join(data.room)

    users.addPerson(client.id, data.name, data.room)

    //List's people connected (send information all people in the same room)
    client.broadcast
      .to(data.room)
      .emit('listPeople', users.getPeopleRoom(data.room))

      
        // message what person joined
    client.broadcast
      .to(data.room)
      .emit('createMessage',createMessage('Admin', `${data.name} joined`))

    callback(users.getPeopleRoom(data.room))
  })

  // created meje and send everyone
  client.on('createMessage', (data, callback) => {
    //logged person
    let person = users.getPerson(client.id)

    let message = createMessage(person.name, data.message)

    //message only people in the same room(data.room)
    client.broadcast.to(person.room).emit('createMessage', message)
   
  
    callback(message)
  })

  //clean user disconnected
  client.on('disconnect', () => {
    //not to repeat users if you update the web
    let personDeleted = users.deletePerson(client.id)

    //send message only room where is the personDeleted
    client.broadcast
      .to(personDeleted.room)
      .emit(
        'createMessage',
        createMessage('Admin', `${personDeleted.name} left`)
      )

    //New list's people connected
    client.broadcast
      .to(personDeleted.room)
      .emit('listPeople', users.getPeopleRoom(personDeleted.room))
  })

  //private message
  client.on('privateMessage', (data) => {
    let person = users.getPerson(client.id)

    client.broadcast
      .to(data.for)
      .emit('privateMessage', createMessage(person.name, data.message))
  })
})
