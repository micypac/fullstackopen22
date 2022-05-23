import { useState } from 'react';
import Filter from './Filter';
import InputField from './InputField';
import Persons from './Persons';

const App = () => {

  const [persons, setPersons] = useState(           // Stores the state of the list of person contacts.
    [
      {
        id: 1,
        name: 'Ashley Clarke',
        number: '201-123-4567'
      },
      {
        id: 2,
        name: 'Jenny Muchnik',
        number: '201-834-9123'
      },
      {
        id: 3,
        name: 'Monica Grace',
        number: '201-000-4577'
      },
      {
        id: 4,
        name: 'Michaela Lao',
        number: '973-785-1234'
      }
    ]
  )
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

  // Handle button submit event.
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if person already exist in the phonebook.
    for (let i = 0; i < persons.length; i++){
      if (newName.toLowerCase() === persons[i].name.toLowerCase()) {
        alert(`${newName} is already added to the phonebook`);
        setNewName('');
        return
      }
    }

    // create a new person object to be appended on the person contacts list.
    const person = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(person));
    setNewNumber('');
    setNewName('');
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
      <Persons persons={personsFiltered} />
    </div>
  )
}

export default App;
