import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "../pages/Login/Login"
import DashboardLayout from "../components/layout/DashboardLayout"
import ProtectedRoute from "../components/auth/ProtectedRoute"
import Home from "../pages/Home/Home"
import History from "../pages/History/History"
import Deposit from "../pages/Deposit/Deposit"
import Withdraw from "../pages/Withdraw/Withdraw"
import Convert from "../pages/Convert/Convert"

export function Router() {
 return (
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login />} />

    <Route element={<ProtectedRoute />}>
     <Route path="/dashboard" element={<DashboardLayout />}>
      <Route index element={<Navigate to="home" replace />} />
      <Route path="home" element={<Home />} />
      <Route path="history" element={<History />} />
      <Route path="deposit" element={<Deposit />} />
      <Route path="withdraw" element={<Withdraw />} />
      <Route path="convert" element={<Convert />} />
     </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
   </Routes>
  </BrowserRouter>
 )
}
