import { useState, useEffect } from "react";

import services from "./services/services";

function capitalizeFLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const RemoveButton = ({ id, persons, setPersons }) => {
  const handleclick = () => {
    var currentObject = persons.filter((person) => person.id === id);

    var promptValue = window.confirm(
      `you sure you want to delete ${currentObject[0].name} ? `
    );

    if (promptValue === true) {
      // Call the remove function and update state after removal
      services.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return <button onClick={handleclick}>delete</button>;
};

const ShowResults = ({ searchTerm, persons, setPersons }) => {
  if (searchTerm === "") {
    return persons.map((x) => {
      return (
        <li key={x.name}>
          {x.name} {x.number}
          <RemoveButton id={x.id} persons={persons} setPersons={setPersons} />
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
          <RemoveButton id={x.id} persons={persons} setPersons={setPersons} />
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
        Name <input type="text" value={newName} onChange={handleChangeName} />
      </div>
      <div>
        Number
        <input type="number" value={newNumber} onChange={handleChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const SearchBar = ({ searchTerm, handleSearchTerm }) => {
  return (
    <p>
      filter shown with <input value={searchTerm} onChange={handleSearchTerm} />{" "}
    </p>
  );
};

const Heading = ({ label }) => {
  return <h2>{label}</h2>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setnewNumber] = useState("");
  const [searchTerm, setsearchTerm] = useState("");

  const handleChangeName = (event) => {
    setNewName(event.target.value);

    var answer = persons.reduce((name, person) => {
      if (name) {
        return true;
      }
      return person.name === capitalizeFLetter(event.target.value);
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

  // Function to find the ID of a person by name
  function findIdByName(nameToFind) {
    const person = persons.find((person) => person.name === nameToFind);
    return person ? person.id : null;
  }

  const handleSubmitted = (event) => {
    event.preventDefault();

    if (newName === "" || newNumber === "") {
      return alert("Name or Number cannot be empty ! ");
    }

    // if new name == a persons name in database then ask for repalce else dont ask for replace and add the person already

    var answer = persons.reduce((name, person) => {
      if (name) {
        return true;
      }
      return person.name === capitalizeFLetter(newName);
    }, false);

    if (answer === true) {
      let prompt_value = window.confirm(
        `${newName} is already added to phonebook you sure you want to replace with the new number ${newNumber} ? `
      );

      // send the put request to the server to replace .
      if (prompt_value) {
        let thatID = findIdByName(capitalizeFLetter(newName));
        var newObject = {
          name: capitalizeFLetter(newName),
          number: newNumber,
        };

        return services.update(thatID, newObject).then((Response) =>
          services.getAll().then((data) => {
            setPersons(data);
          })
        );
      }
    }

    // call the services here to add the new object to the setpersons state and cause a app component refresh
    var newObject = {
      name: capitalizeFLetter(newName),
      number: newNumber,
    };

    services
      .create(newObject)
      .then((Response) =>
        setPersons([
          ...persons,
          { name: Response.name, number: Response.number, id: Response.id },
        ])
      );

    setNewName("");
    setnewNumber("");
  };

  // picking initial data
  useEffect(() => {
    services.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  return (
    <>
      <Heading label={"PhoneBook"} />
      <SearchBar searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} />
      <Addpersons
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        handleSubmitted={handleSubmitted}
        newName={newName}
        newNumber={newNumber}
      />
      <Heading label={"Numbers"} />
      <ShowResults
        searchTerm={searchTerm}
        persons={persons}
        setPersons={setPersons}
      />
    </>
  );
};
export default App;
