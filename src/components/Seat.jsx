import { useState , useEffect } from 'react'
import '../components/App.css'
import timeList from './Time'

function Seat(props){
    const [arr,setArr] = useState([])
  useEffect(()=>{
    for(let i=0;i<102;i++){
      setArr((oldnum)=>{return [...oldnum,i]})
  }
  },[])

  const [seatStatus,setSeatStatus] = useState(Array(70).fill(false))
  const movieData = props.selectInfo
  const [timeSelect,setTimeSelect] = useState('')

  return (
    <div className='seatAndScreen'>
      <div className="infoContainer">
        <img src={movieData.imgUrl}></img>
        <div className="info">
          <h4>{movieData.name}</h4>
          <h5 onClick={()=>setTime(index)}>{movieData.time}</h5>
        </div>
      </div>
      <div className="timeContainer">
        {timeList.map((e,index)=>{
          return(
            <div key={index}>
              <h2>{e.time}</h2>
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
    setTimeSelect(timeList[i])
  }

}

export default Seat