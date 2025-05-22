import React from 'react'
import { auth } from './Firebase'
import { db } from './Firebase'
import { useState , useEffect } from 'react'
import { getFirestore, collection, getDocs , addDoc ,updateDoc, deleteDoc ,doc} from 'firebase/firestore/lite';


function History(props) {

  const [dataList,setDataList] = useState([])
  const user = auth.currentUser
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

  return (
    <div className='his-container'>
      <div className="list-topic">
            <ul>
              <li>ชื่อภาพยนตร์</li>
              <li>รอบฉาย</li>
              <li>วัน/เวลาที่จอง</li>
              <li className='seatList'>ที่นั่ง</li>
            </ul>
          </div>
      {dataList.map((e,index)=>{
        if(e.uid === user.uid){
          return(
            <div className="list">
              <ul className='listUl'>
                <li>{e.name}</li>
                <li>{e.time}</li>
                <li>{e.date}</li>
                <li className='seatList'>{e.seat.map(e=><h4>{e}</h4>)}</li>
              </ul>
            </div>
          )
        }
      })}
    </div>
  )
}

export default History