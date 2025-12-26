import { Link } from 'react-router-dom'

function About() {
  return (
    <div>
      <h1>About</h1>
      <p>This is a simple React example with React Router.</p>
      <p>
        <Link to="/">Go to Home</Link>
      </p>
    </div>
  )
}

export default About
