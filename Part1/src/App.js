/* const App = () => {
  console.log('Hello from component')
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}

export default App */


// Dynamic component
/* const App = () => {
  const now = new Date()
  const a = 10
  const b = 20

  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
}

export default App */

// Multiple components
// example one:
/* const Hello = (props) => {  return (    <div>      <p>Hello {props.name}</p>    </div>  )}
const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='George' />      
      <Hello name='Daisy' />  
    </div>
  )
}
export default App */

// example two:
const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old      </p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/bareknuckles'>bareknuckles</a>
    </div>
  )
}

const App = () => {
  const name = 'Peter'  
  const age = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Maya' age={26 + 10} />      
      <Hello name={name} age={age} />  
      <Footer />  
    </div>
  )
}

export default App