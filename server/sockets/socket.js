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

    let people = users.addPerson(client.id, data.name, data.room)

    //List's people connected (send information all people in the same room)
    client.broadcast.emit('listPeople', users.getPeople())

    callback(people)
  })

  // created meje and send everyone
  client.on('createMessage', (data) => {
    //logged person
    let person = users.getPerson(client.id)

    let message = createMessage(person.name, data.message)

    client.broadcast.emit('createMessage', message)
  })

  //clean user disconnected
  client.on('disconnect', () => {
    //not to repeat users if you update the web
    let personDeleted = users.deletePerson(client.id)

    client.broadcast.emit(
      'createMessage',
      createMessage('Admin', `${personDeleted.name} left`)
    )

    //New list's people connected
    client.broadcast.emit('listPeople', users.getPeople())
  })

  //private message
  client.on('privateMessage', (data) => {
    let person = users.getPerson(client.id)

    client.broadcast
      .to(data.for)
      .emit('privateMessage', createMessage(person.name, data.message))
  })
})
