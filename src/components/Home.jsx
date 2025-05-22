import { useState , useEffect } from 'react'
import MovieData from './Data'
import { Link } from 'react-router-dom'
import Ads from './Ads'

function Home(props){
    return(
        <>
            <div className="ads-container">
                {Ads.map((e,index)=>{
                    return(
                        <div className="box">
                            <img src={e.imgUrl}></img>
                        </div>
                    )
                })}
            </div>
            <h1 className='title'>Now Showing</h1>
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
        </>
    )
    function selectMovie(index){
        props.getInfo(MovieData[index])

    }
}

export default Home