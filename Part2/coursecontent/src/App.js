import React from 'react';
import Course from './Components/Course';

// const Total = (props) => {
//   return(
//     <div>
      
//       <p>{props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}</p>
//     </div>
//   )
// }

const App = ( {courses} ) => {
  return(
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};


// return(
//   <div>
//     <Header course={courses.name} />
//     <Content content={courses.parts} />
//     <Total total={courses.parts} />
//   </div>
// )

export default App