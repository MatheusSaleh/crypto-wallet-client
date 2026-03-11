import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../pages/Login/Login"

function Home() {
    return <h1>Dashboard</h1>
}

export function Router() {
 return (
  <BrowserRouter>
   <Routes>

    <Route path="/" element={<Login />} />

    <Route path="/home" element={<Home />} />

   </Routes>
  </BrowserRouter>
 )
}