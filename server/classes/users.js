class Users {
  constructor() {
    this.people = []
  }

  addPerson(id, name, room) {
    let person = {id, name, room}

    this.people.push(person)

    return this.people
  }

  getPerson(id) {
    let person = this.people.filter((person) => person.id === id)[0]

    return person
  }

  getPeople() {
    return this.people
  }

  getPeopleRoom(room) {
    let personRoom = this.people.filter((person) => person.room === room)
    return personRoom
  }

  deletePerson(id) {
    //to get person desconnected
    let personDeleted = this.getPerson(id)

    //people connected
    this.people = this.people.filter((person) => person.id !== id)

    return personDeleted
  }
}

module.exports = {
  Users,
}
