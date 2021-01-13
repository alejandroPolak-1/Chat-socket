const {io} = require('../server')
const {Users} = require('../classes/users')

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

    callback(people)
  })

  //clean user disconnected
  client.on('disconnect', () => {
    //not to repeat users if you update the web
    let personDeleted = users.deletePerson(client.id)

    client.broadcast.emit('sendMessage', {
      user: 'Admin',
      message: `${personDeleted.name} left the chat`,
    })
  })
})
