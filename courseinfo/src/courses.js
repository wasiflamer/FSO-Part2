
const Header = ({ courses }) => {
  return <h1> {courses} </h1>;
};

const Part = ({ name, exe, id }) => {
  return (
    <li key={id}>
     <p>{name} {exe}</p> 
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
export default Course;

