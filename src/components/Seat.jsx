import { useState , useEffect } from 'react'
import '../components/App.css'
import timeList from './Time'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { db } from './Firebase';
import { getFirestore, collection, getDocs , addDoc ,updateDoc, deleteDoc ,doc} from 'firebase/firestore/lite';
import Swal from 'sweetalert2';

function Seat(props){
    const location = useLocation()
    const navigate = useNavigate()
    const [arr,setArr] = useState([])
    const [timelist,setTimelist] = useState(Array(timeList.length).fill(false))
    const [timeselect , setTimeSelect] = useState('')
    const [seatSelect , setSeatSelect] = useState([])
    const [selectSeatStatus,setSelectSeat] = useState(false)

    useEffect(()=>{
    for(let i=0;i<102;i++){
      setArr((oldnum)=>{return [...oldnum,i]})
  }
  },[])
  
  const [seatStatus,setSeatStatus] = useState(Array(70).fill(false))
  const movieData = props.selectInfo

  useEffect(()=>{
    if(movieData.length ===0){
      navigate('/');
    }
  },[])

  useEffect(()=>{
    const select = seatStatus.map((e,index)=>{
      if(e === true){
        return index
      }
      else{
        return null
      }
    }).filter((e,index)=>{
      return e != null
    })
    setSeatSelect(select)
  },seatStatus)

  useEffect(()=>{
    if(seatStatus.length>0){
      setSelectSeat(true)
    }
    else{
      setSelectSeat(false)
    }
  },[seatStatus])

  return (
    <div className='seatAndScreen'>
      <div className="infoContainer">
        <img src={movieData.imgUrl}></img>
        <p className='line'></p>
        <div className="info">
          <h4>{movieData.name}</h4>
          <h5 >{movieData.time}</h5>
        </div>
      </div>
      <div className="timeContainer">
        {timeList.map((e,index)=>{
          const timeChoose = timelist[index] ? 'book' : 'unselect'
          return(
            <div key={index}>
              <h2 className={timeChoose} onClick={()=>setTime(index)}>{e.time}</h2>
            </div>
          )
        })}
      </div>
      <div className="screen-container">
        <svg viewBox="0 0 500 100" className="screen-curve">
            <path d="M 0 80 Q 250 0 500 80" stroke="white" strokeWidth="4" fill="none" />
        </svg>
      </div>
      <div className="seatcontainer">
        {arr.map((e,index)=>{
          const status = seatStatus[index] ? 'selected' : 'blank'
          return(
            <div key={index}>
              <div className={`seat ${status}`} onClick={()=>setSeat(index)}></div>
            </div>
          )
        })}
      </div>
      <div className="report">
        <h3>ที่นั่งที่คุณเลือก{seatSelect.map((e,index)=><h4 className='seatCount' key={index}>{e}</h4>)}</h3>
        <h3>ราคา {seatSelect.length * 220} บาท </h3>
      </div>
      <button className='booking' onClick={sendData}>Booking</button>
    </div>
  )
  function setSeat(i){
    const newArr = [...seatStatus]
    newArr[i] = !newArr[i]
    setSeatStatus(newArr)
  }
  function setTime(i){
    const newArr = (Array(timeList.length).fill(false))
    newArr[i] = true
    setTimelist(newArr)
    setTimeSelect(timeList[i])
  }
  function sendData(e){
    e.preventDefault()
    const data = {
      name:movieData.name,
      time:timeselect,
      seat:seatSelect,
      price:seatSelect.length*220
    }
    addDoc(collection(db,'movielist'),{
      name:movieData.name,
      time:timeselect,
      seat:seatSelect,
      price:seatSelect.length*220
    })
    Swal.fire({
      title: "complete",
      icon: "success",
      draggable: true
    }).then(()=>{
      navigate('/');
    })
  }

}

export default Seat