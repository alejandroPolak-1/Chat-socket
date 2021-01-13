class Users {
  constructor() {
    this.people = []
  }

  addPerson(id, name) {
    let person = {id, name}

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

  getPeopleRoom(room) {}

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
