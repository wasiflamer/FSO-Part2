import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ])
  const [newName, setNewName] = useState('')

  const handleInputChange = (event) => {
   
    setNewName(event.target.value)

    var answer = persons.reduce((name, person) => {
    if (name) {
    return true; 
    }
    return person.name === event.target.value;
    }, false);

    if ( answer === true)
    {
      setTimeout(() => {
        return alert(`${event.target.value} is already added to phonebook`)
    }, 100);
  
    }
   
  };

  const handleInputsubmitted = (event) => {
   
    event.preventDefault()
    setPersons([...persons, { name: newName },])
    setNewName('');
    
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={handleInputsubmitted}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((x) => <li key={x.name}>{x.name}</li>)}
    </>
  )
}

export default App