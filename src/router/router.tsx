import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../pages/Login/Login"
import DashboardLayout from "../components/layout/DashboardLayout"
import Home from "../pages/Home/Home"
import Users from "../pages/Users/Users"
import Deposit from "../pages/Deposit/Deposit"
import Withdraw from "../pages/Withdraw/Withdraw"
import Convert from "../pages/Convert/Convert"



export function Router() {
 return (
  <BrowserRouter>
   <Routes>

    <Route path="/" element={<Login />} />

    <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="convert" element={<Convert />} />
    </Route>
   </Routes>
  </BrowserRouter>
 )
}