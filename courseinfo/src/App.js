const Course = ({ course }) => {
  // getting course
  // now format it below

  console.log(course.name);

  return (
    <>
      <Header course_name={course.name} />;
    </>
  );
};

const Header = ({ course_name }) => {
  return <h1> {course_name} </h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exe}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      <Part
        name={props.course["parts"][0].name}
        exe={props.course["parts"][0].exercises}
      />
      <Part
        name={props.course["parts"][1].name}
        exe={props.course["parts"][1].exercises}
      />
      <Part
        name={props.course["parts"][2].name}
        exe={props.course["parts"][2].exercises}
      />
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>
        Total Excercises{" "}
        {props.course["parts"][0].exercises +
          props.course["parts"][1].exercises +
          props.course["parts"][2].exercises}{" "}
      </p>
    </>
  );
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
    ],
  };

  return <Course course={course} />;
};

export default App;
