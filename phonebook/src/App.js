import { useState } from 'react';

function capitalizeFLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ShowResults = ({ searchTerm, persons }) => {
  if (searchTerm === '') {
    return persons.map((x) => {
      return (
        <li key={x.name}>
          {x.name} {x.number}
        </li>
      );
    });
  } else {
    let new_map = persons.filter((x) => {
      return x.name.includes(capitalizeFLetter(searchTerm));
    });

    return new_map.map((x) => {
      return (
        <li key={x.name}>
          {x.name} {x.number}
        </li>
      );
    });
  }
};
const Addpersons = ({
  handleSubmitted,
  newName,
  newNumber,
  handleChangeName,
  handleChangeNumber,
}) => {
  return (
    <form onSubmit={handleSubmitted}>
      <div>
        Name <input type='text' value={newName} onChange={handleChangeName} />
      </div>
      <div>
        Number
        <input type='number' value={newNumber} onChange={handleChangeNumber} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

const SearchBar = ({ searchTerm, handleSearchTerm }) => {
  return (
    <p>
      filter shown with <input value={searchTerm} onChange={handleSearchTerm} />{' '}
    </p>
  );
};

const Heading = ({ label }) => {
  return <h2>{label}</h2>;
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
    { name: 'Waseem', number: '39-23-64243122', id: 5 },
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setnewNumber] = useState('');
  const [searchTerm, setsearchTerm] = useState('');

  const handleChangeName = (event) => {
    setNewName(event.target.value);

    var answer = persons.reduce((name, person) => {
      if (name) {
        return true;
      }
      return person.name === event.target.value;
    }, false);

    if (answer === true) {
      setTimeout(() => {
        return alert(`${event.target.value} is already added to phonebook`);
      }, 100);
    }
  };

  const handleChangeNumber = (event) => {
    setnewNumber(event.target.value);
  };

  const handleSearchTerm = (event) => {
    setsearchTerm(event.target.value);
  };

  const handleSubmitted = (event) => {
    event.preventDefault();

    if (newName === '' || newNumber === '') {
      return alert('Name or Number cannot be empty ! ');
    }

    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName('');
    setnewNumber('');
  };

  return (
    <>
      <Heading label={'PhoneBook'} />
      <SearchBar searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} />
      <Addpersons
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        handleSubmitted={handleSubmitted}
        newName={newName}
        newNumber={newNumber}
      />
      <Heading label={'Numbers'} />
      <ShowResults searchTerm={searchTerm} persons={persons} />
    </>
  );
};
export default App;
