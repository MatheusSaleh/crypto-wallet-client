import './App.css'
import { Router } from './router/router'
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <>
      <Toaster position='top-right'/>

      <Router />
    </>
    
  )
}

export default App
