const {io} = require('../server')
const {Users} = require('../classes/users')
const {createMessage} = require('../utilities/utilities')

const users = new Users()

io.on('connection', (client) => {
  client.on('enterChat', (data, callback) => {
    if (!data.name) {
      return callback({
        error: true,
        message: 'The name is required',
      })
    }

    let people = users.addPerson(client.id, data.name)

    //List's people connected
    client.broadcast.emit('listPeople', users.getPeople())

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
  })
})
