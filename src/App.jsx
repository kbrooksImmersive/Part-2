import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayPeople from './components/DisplayPeople'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/numbers'
import Notificaiton from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

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

  const handleDelete = (person) => {
    console.log('handledelete:', person)
    if(window.confirm(`Delete ${person.name}?`)){
      personService.deleteRecord(person.id)
        .then(deletedPerson => {
          const newPeople = persons.filter(person => person.id !== deletedPerson.id)
          setPersons(newPeople)
          setNewName('')
          setNewPhone('')
          console.log('successfully deleted. New poeple list:', newPeople)
        })
    }
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    console.log('handleNameSubmit: check if new name is already in phonebook', newName)

    const personKeys = persons.map(person => person.name/*+person.number*/)
    const matchKey = newName //+ newPhone

    console.log(matchKey, personKeys)

    if(personKeys.includes(matchKey)){
      console.log(`${newName} already in phonebook`)
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number: newPhone}
        personService.update(changedPerson.id, changedPerson)
          .then(updatedPerson => {
            console.log(`${updatedPerson.name} updated: `, updatedPerson)
            setNewName('')
            setNewPhone('')
            setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
            setMessage(`${updatedPerson.name} number successfully updated`)
            setMessageType('success')
            setTimeout(() => {
              setMessage('')
              setMessageType('')
            }, 3000);
          })
          .catch(error => {
            setMessage(`Information on ${changedPerson.name} has already been deleted from the server`)
            setMessageType('error')
            setTimeout(() => {
              setMessage('')
              setMessageType('')
            }, 3000);
          })
      }
      else{
        console.log(`${newName} not updated`)
      }
    }
    else{
      console.log(`person to be added to phonebook`)
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
          setMessage(`${createdPreson.name} successfully added`)
            setMessageType('success')
            setTimeout(() => {
              setMessage('')
              setMessageType('')
            }, 3000);
        })
      
    }
  }

  const peopleToShow = persons.filter(person => person.name.toLocaleLowerCase().includes(filter))
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notificaiton message={message} type={messageType}/>
      <Filter value={filter} handleEvent={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm handlePersonSubmit={handlePersonSubmit} nameVal={newName} handleNameChange={handleNameChange} phoneVal={newPhone} handlePhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <DisplayPeople peopleToShow={peopleToShow} handledelete={handleDelete}/>
    </div>
  )
}

export default App