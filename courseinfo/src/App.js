const Course = ({ courses }) => {
  var Column_Heading = ["sd", "rim jon", "kkaf", "awwz"];
  var data = ["rdf", "kksdff", "dsfwz"];
  var Column_footer = ["rdsfn", "kdsf", "adf"];

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>{Column_Headin}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>{Column_footer}</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

const Header = ({ course_name }) => {
  return <h1> {course_name} </h1>;
};

const Part = ({ name, exe, id }) => {
  return (
    <li key={id}>
      {name} {exe}
    </li>
  );
};

const Content = ({ course }) => {
  return course.parts.map((x) => (
    <Part key={x.id} name={x.name} exe={x.exercises} />
  ));
};

const Total = ({ course }) => {
  let total = course.parts.reduce((sum, x) => {
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
