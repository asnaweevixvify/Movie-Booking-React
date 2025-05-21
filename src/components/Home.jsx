import { useState , useEffect } from 'react'
import MovieData from './Data'
import { Link } from 'react-router-dom'


function Home(props){
    return(
        <div className='movieAll'>
            {MovieData.map((e,index)=>{
                return(
                    <Link to='/booking' key={index}><div className="moviecontainer" onClick={()=>selectMovie(index)}>
                        <img src={e.imgUrl}></img>
                        <p className='movieTitle'>{e.name}</p>
                    </div></Link>
                )
            })}
        </div>
    )
    function selectMovie(index){
        props.getInfo(MovieData[index])

    }
}

export default Home