import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName,    setNewName]     = useState('')
  const [newNumber,  setnewNumber]   = useState('')
  const [searchTerm, setsearchTerm]  = useState('')

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
   
  }

   const handleChangeNumber = (event) => {
    setnewNumber(event.target.value)
  }

   const handleChangesearchTerm = (event) => {
    setsearchTerm(event.target.value)
  }


  const handleSubmitted = (event) => {

    event.preventDefault()

    if (newName === '' || newNumber === '' ) {
    return alert('Name or Number cannot be empty ! ')
    }

    setPersons([...persons, { name: newName, number : newNumber },])
    setNewName('');
    setnewNumber('');

  }

  const ShowResults = () => {

      return (
          persons.map((x) => {      
          return <li key={x.name}> {x.name} {x.number} </li>
        })
      );
    
  }

  const Searchbar = () => {
    return (
    <>  
      filter shown with <input value={{searchTerm}} onChange={handleChangesearchTerm}/> 
    </> 
    );

  }

 
  return (
    <>
      <h2>Phonebook</h2>
      <Searchbar/>

      <form onSubmit={handleSubmitted}>
         
          <div>
            Name <input value={newName} onChange={handleChangeName}/>
          </div>

          <div>
            Number <input type='number' value={newNumber} onChange={handleChangeNumber}/>
          </div>
          
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <ShowResults  />

    </>
  )
}

export default App