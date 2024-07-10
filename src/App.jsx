import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayPeople from './components/DisplayPeople'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')

    personService.getAll()
      .then(initialPeople => {setPersons(initialPeople)})
  }, [])
  console.log('render', persons.length, 'notes')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    console.log('handleNameSubmit: check if new name is already in phonebook', newName)

    const personKeys = persons.map(person => person.name+person.number)
    const matchKey = newName + newPhone

    console.log(matchKey, personKeys)

    if(personKeys.includes(matchKey)){
      console.log('name already in phonebook')
      alert(`${newName} is already added to phonebook`)
    }
    else{
      console.log('person to be added to phonebook')
      const newPerson = {
          name: newName,
          number: newPhone
        }
      
      personService.create(newPerson)
        .then(createdPreson => {
          setPersons(persons.concat(createdPreson))
          setNewName('')
          setNewPhone('')
          console.log('new person created:', createdPreson)
        })
      
    }
  }

  const peopleToShow = persons.filter(person => person.name.toLocaleLowerCase().includes(filter))
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleEvent={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm handlePersonSubmit={handlePersonSubmit} nameVal={newName} handleNameChange={handleNameChange} phoneVal={newPhone} handlePhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <DisplayPeople peopleToShow={peopleToShow}/>
    </div>
  )
}

export default App