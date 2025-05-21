import { useState , useEffect } from 'react'
import '../src/components/App.css'
import Seat from './components/Seat'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
function App() {
  const [selectInfo,setSelectInfo] = useState([])

  function getInfo(data){
    setSelectInfo(data)
  }
  return(
    <>
      <Routes>
        <Route path='/' element={<Home getInfo={getInfo}/>}></Route>
        <Route path='/booking' element={<Seat selectInfo={selectInfo}/>}></Route>
    </Routes>
    </>
  )
}

export default App
