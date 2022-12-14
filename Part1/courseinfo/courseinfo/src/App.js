/* const Header = (props) => {
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  console.log(props)
  return(
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <h3>Total: </h3>
      <p>{props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
} */

// export default App

// WORKING WITH COMPONENTS PART ONE

/* const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

export default App */

// WORKING WITH COMPONENTS PART TWO
/* const Hello = (props) => {
  const bornYear = () => {    
    const yearNow = new Date().getFullYear()    
    return yearNow - props.age  
  }
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
} */

// export default App
/* const Hello = (props) => {
  const name = props.name
  const age = props.age

  const bornYear = () => {
    return new Date().getFullYear - age
  }
  console.log(bornYear())
  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>      
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

export default App */



/* const App = () => {
  const [ counter, setCounter ] = useState(0) */

 /*  const handleClick = () => {
    console.log('clicked')  
  } */

/*   return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>plus</button>  
      <button onClick={() => setCounter(0)}>zero</button>  
    </div>
  ) */
/* } */

/* const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)    
  const setToZero = () => setCounter(0)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseByOne}>        
          plus
      </button>
      <button onClick={setToZero}>        
          zero
      </button>
    </div>
  )
} */
/* const Display = (props) => {
  return(
    <div>{props.counter}</div>
  )
} */

/* const Display = ({ counter }) => {
  return (
    <div>{counter}</div>
  )
} */



/* const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
} */

/* const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
) */


// EXAMPLE ONE

//import { useState } from 'react'
// const Display = ({ counter }) => <div>{counter}</div>
// const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

/*const App = () => {

  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const handleLeftClick = () => {
    const newClicks = { 
      left: clicks.left + 1, 
      right: clicks.right 
    }
    setClicks(newClicks)
  }

  const handleRightClick = () => {
    const newClicks = { 
      left: clicks.left, 
      right: clicks.right + 1 
    }
    setClicks(newClicks)
  }
  console.log(clicks.left)
  console.log(clicks.right)

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  )
}
export default App*/

/*Handling arrays*/

import { useState } from 'react'

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        )
    }
    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])
    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
    }
    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
    }
    console.log(allClicks)
    return (
        <div>
            {left}
            <Button handleClick={handleLeftClick} text='left' />
            <Button handleClick={handleRightClick} text='right' />
            {right}
            <History allClicks={allClicks} />
        </div>
    )
}
export default App