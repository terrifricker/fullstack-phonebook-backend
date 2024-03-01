const mongoose = require('mongoose')

// node mongo.js
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

// node mongo.js yourpassword
if (process.argv.length === 3) {

  const password = process.argv[2]

  const url =
  `mongodb+srv://fullstack:${password}@fullstack-phonebook.vdi2yxb.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=fullstack-phonebook`
  mongoose.set('strictQuery',false)

  mongoose.connect(url)

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
  const Person = mongoose.model('Person', personSchema)

  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  
  // node mongo.js yourpassword Anna 040-1234556
  const password = process.argv[2]
  const name = process.argv[3]
  const number = process.argv[4]
  
  const url =
    `mongodb+srv://fullstack:${password}@fullstack-phonebook.vdi2yxb.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=fullstack-phonebook`
  mongoose.set('strictQuery',false)
  
  mongoose.connect(url)
  
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
  const Person = mongoose.model('Person', personSchema)
  
  const person = new Person({
    name: name,
    number: number,
  })
  
  // added Anna number 040-1234556 to phonebook
  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
  
    mongoose.connection.close()
  })
}

