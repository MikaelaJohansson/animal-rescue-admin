import {useState} from 'react'
import {Route, Routes} from "react-router-dom"
import Login from "../src/pages/Login/Login"
import Dashborad from "../src/pages/Dashboard/Dashboard"

export default function App() {

  const [isLoggedIn,  setIsLoggedIn] = useState(false)




  return (
    <Routes>
      <Route path='/' element={<Login  setIsLoggedIn={ setIsLoggedIn}/>} />
      <Route path='dashboard' element={<Dashborad/>} />
    </Routes>
  )
}
