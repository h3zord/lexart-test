import { Routes, Route } from 'react-router-dom'
import { Login } from '../pages/login'
import { Home } from '../pages/home'
import { Register } from '../pages/register'
import { EditCellphones } from '../pages/editCellphones'
import { AddCellphones } from '../pages/addCellphones'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/edit" element={<EditCellphones />} />
      <Route path="/create" element={<AddCellphones />} />
    </Routes>
  )
}
