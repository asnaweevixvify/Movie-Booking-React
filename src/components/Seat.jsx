import { useState , useEffect } from 'react'
import '../components/App.css'
import timeList from './Time'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function Seat(props){
    const location = useLocation()
    const navigate = useNavigate()
    const [arr,setArr] = useState([])
    const [timelist,setTimelist] = useState(Array(timeList.length).fill(false))
    const [timeselect , setTimeSelect] = useState('')


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

  return (
    <div className='seatAndScreen'>
      <div className="infoContainer">
        <img src={movieData.imgUrl}></img>
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

}

export default Seat