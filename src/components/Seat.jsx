import { useState , useEffect } from 'react'
import '../components/App.css'
import timeList from './Time'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { db } from './Firebase';
import { getFirestore, collection, getDocs , addDoc ,updateDoc, deleteDoc ,doc} from 'firebase/firestore/lite';
import Swal from 'sweetalert2';
import { auth } from './Firebase';

function Seat(props){
    const location = useLocation()
    const navigate = useNavigate()
    const [arr,setArr] = useState([])
    const [timelist,setTimelist] = useState(Array(timeList.length).fill(false))
    const [timeselect , setTimeSelect] = useState('')
    const [seatSelect , setSeatSelect] = useState([])
    const [selectSeatStatus,setSelectSeat] = useState(false)

    const [dataList,setDataList] = useState([])
    useEffect(()=>{
    async function getList(db){
      const empCol = collection(db,'movielist')
      const empSnapshot = await getDocs(empCol)
      const newItem = empSnapshot.docs.map(e=>({
        ...e.data(),id:e.id
      }))
      setDataList(newItem)  
    }
    getList(db)
  },[])

    useEffect(()=>{
    for(let i=0;i<102;i++){
      setArr((oldnum)=>{return [...oldnum,i]})
  }
  },[])
  
  const [seatStatus,setSeatStatus] = useState(Array(70).fill(false))
  const [seatBlank,setSeatBlank] = useState(Array(70).fill(false))
  const movieData = props.selectInfo

  useEffect(()=>{
    if(movieData.length ===0){
      navigate('/');
    }
  },[])

  useEffect(()=>{
    const newArr= Array(70).fill(false)
    dataList.forEach(e=>{
      if(movieData.name === e.name && timeselect === e.time){
        e.seat.forEach(e=>{
          newArr[parseInt(e)] = true
        })
      }
    })
    setSeatBlank(newArr)
  },[dataList , timeselect])
  

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
  const [bookBtn , setBookBtn] = useState(true)
  useEffect(()=>{
    if(timeselect === '' || seatSelect.length<=0){
      setBookBtn(true)
    }
    else{
      setBookBtn(false)
    }
  },[timeselect,seatSelect])

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
          const blank = seatBlank[index] ? 'unAvail' : null
          return(
            <div key={index}>
              <div className={`seat ${status} ${blank}`} onClick={()=>setSeat(index)}></div>
            </div>
          )
        })}
      </div>
      <div className="report">
        <h3>ที่นั่งที่คุณเลือก{seatSelect.map((e,index)=><h4 className='seatCount' key={index}>{e}</h4>)}</h3>
        <h3>ราคา {seatSelect.length * 220} บาท </h3>
      </div>
      <button className='booking' disabled={bookBtn} onClick={sendData}>Booking</button>
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
    setTimeSelect(timeList[i].time)
  }
  function sendData(e){
    e.preventDefault()
    const user = auth.currentUser
    addDoc(collection(db,'movielist'),{
      name:movieData.name,
      time:timeselect,
      seat:seatSelect,
      price:seatSelect.length*220,
      uid:user.uid
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