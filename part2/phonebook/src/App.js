import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import InputField from './components/InputField';
import Persons from './components/Persons';
import contactService from './services/phonebook'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')        // Stores state for the name field.
  const [newNumber, setNewNumber] = useState('')    // Stores state for the number field.
  const [newFilter, setNewFilter] = useState('')    // Stores state for the filter field.

  // Handle name field onchange event.
  const handleNewName = (event) => {    
    setNewName(event.target.value);
  }

  // Handle number field onchange event.
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  }

  // Handle filter field onchange event.
  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  }

  // Initial fetch of contact from db.json
  useEffect(() => {
    contactService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // Handle button submit event.
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check contact list if person already exist. If exist and user confirmed, update person object with new number.
    const newPerson = persons.find( person => person.name.toLowerCase() === newName.toLowerCase());

    if (newPerson) {
      if (window.confirm(`${newPerson.name} already exist, replace entry?`)) {

        const updatedPerson = {...newPerson, number: newNumber}

        contactService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map( item => item.id !== updatedPerson.id ? item : returnedPerson))
          })
      }
    } else {
      
        // create a new person object to be appended on the person contacts list.
        const nameTitle = newName.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const person = {
          name: nameTitle,
          number: newNumber
        }

        contactService
          .create(person)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson));            
          })
    }

    setNewNumber('');
    setNewName('');    
  }

  // Handle delete contact button.
  const deleteContact = (id) => {
    const person = persons.find( person => person.id === id)
    if (window.confirm(`Do you really want to delete ${person.name}?`)){
      contactService
        .remove(id)
        .then(returnedPerson => {
          setPersons( persons.filter( item => item.id !== id))
        })
    }    
  }

  // Array to be rendered on the page based on filter input field. If blank, display the entire persons list.
  const personsFiltered = !newFilter 
    ? persons 
    : persons.filter( person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <InputField newValue={newName} handleNewValue={handleNewName} text="Name: " />
        <InputField newValue={newNumber} handleNewValue={handleNewNumber} text="Number: " />
        <div><button type="submit">Add</button></div>
      </form>
      
      <h2>Numbers</h2>
      <Persons persons={personsFiltered} deleteContact={deleteContact} />
    </div>
  )
}

export default App;
