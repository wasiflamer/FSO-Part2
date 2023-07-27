const Course = ({ courses }) => {
  return ( courses.map((x) =>    
      <li key={x.id} >
        <ul>
        <Header  courses ={x.name} />
        <Content courses ={x.parts}/>
        <Total   courses ={x.parts}/>
        </ul>
      </li>
    )
  );
};

const Header = ({ courses }) => {
  return <h1> {courses} </h1>;
};

const Part = ({ name, exe, id }) => {
  return (
    <li key={id}>
      {name} {exe}
    </li>
  );
};

const Content = ({ courses }) => {
  return courses.map((x) => (
    <Part key={x.id} name={x.name} exe={x.exercises} />
  ));
};

const Total = ({ courses }) => {
  let total = courses.reduce((sum, x) => {
    return sum + x.exercises;
  }, 0);

  return <h4> Total of {total} Execercises </h4>;
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <Course courses={courses} />
    </>
  );
};

export default App;
