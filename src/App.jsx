import { useState , useEffect } from 'react'
import '../src/components/App.css'
import Seat from './components/Seat'
import Home from './components/Home'
import Login from './components/Login'
import Nav from './components/Nav'
import Register from './components/Register'
import History from './components/History'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [selectInfo,setSelectInfo] = useState([])

  function getInfo(data){
    setSelectInfo(data)
  }
  
  return(
    <>
    <Nav/>
      <Routes>
        <Route path='/' element={<Home getInfo={getInfo}/>}></Route>
        <Route path='/booking' element={<Seat selectInfo={selectInfo}/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/history' element={<History/>}></Route>
    </Routes>
    </>
  )
}

export default App
