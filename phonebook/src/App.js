import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Waseem Raza' },
  ])
  const [newName, setNewName] = useState('')


  const handleInputChange = (event) => {
    setNewName(event.target.value)
    console.log(newName)
  };

  const handleInputsubmitted = () => {
    setPersons([persons.push({name:newName})])
    
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={handleInputsubmitted} method='POST'>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
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