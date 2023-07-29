import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '03314149234'},
  ])

  const [newName,   setNewName]   = useState('')
  const [newNumber, setnewNumber] = useState('')

  const handleChangeName = (event) => {
   
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

   const handleChangeNumber = (event) => {
    setnewNumber(event.target.value)
  }

  const handleSubmitted = (event) => {

    event.preventDefault()

    if (newName === '' || newNumber === '' ) {
    return alert('Name or Number cannot be empty ! ')
    }

    setPersons([...persons, { name: newName, number : newNumber },])
    setNewName('');
    setnewNumber('');

  };

 
  return (
    <>
      <h2>Phonebook</h2>

      <form onSubmit={handleSubmitted}>
         
          <div>
            Name <input value={newName} onChange={handleChangeName} />
          </div>

          <div>
            Number <input type='number' value={newNumber} onChange={handleChangeNumber} />
          </div>
          
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((x) => <li key={x.name}> {x.name} {x.number}  </li>)}
    </>
  )
}

export default App