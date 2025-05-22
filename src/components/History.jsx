import React from 'react'
import { auth } from './Firebase'
import { db } from './Firebase'
import { useState , useEffect } from 'react'
import { getFirestore, collection, getDocs , addDoc ,updateDoc, deleteDoc ,doc} from 'firebase/firestore/lite';


function History() {

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
  console.log(dataList);

  return (
    <div></div>
  )
}

export default History