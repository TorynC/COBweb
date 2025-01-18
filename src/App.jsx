import { useState } from 'react'
import GeminiLLM from './api_calls/gemini';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
          <div>
              <h1>Welcome to the App</h1>
              <GeminiLLM/>
          </div>
          <div className="custom-text">
              <p>Colin Northward</p>
          </div>
      </>
  )
}

export default App
