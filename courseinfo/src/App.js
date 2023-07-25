const Course = ({ course }) => {
  
  return (
    <>
      <Header course_name={course.name} />
      <Content course={course}/>
      <Total course={course}/>
    </>
  );
};

const Header = ({ course_name }) => {
  return <h1> {course_name} </h1>;
};

const Part = ({name,exe, id }) => {
  return (
    <li key={id}>
      {name} {exe}
    </li>
  );
};

const Content = ({course}) => {

    return course.parts.map(x => <Part key={x.id} name={x.name} exe={x.exercises}/>);

};

const Total = ({course}) => {


};

const App = () => {
  
  const course = {
    id: 1,
    name: "Half Stack application development",
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
        exercises: 4,
        id: 4,
      },
       {
        name: "Mulum",
        exercises: 10,
        id: 5,
      },
      
    ],
  };

  return <Course course={course} />;
};

export default App;
