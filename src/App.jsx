import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Legislators from './views/Legislators.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <h1>U.Politic</h1>
      <Legislators />
      </div>

    </>
  )
}

export default App
