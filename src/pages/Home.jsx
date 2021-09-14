import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../components/card/Card'

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [rooms, setRooms] = useState([])
    
    const getAllRooms = async () =>{
        setLoading(true)
        try {
            const {data} = await axios.get("/api/rooms/")
            setRooms(data.allrooms)
            setLoading(false)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getAllRooms()
    },[])

   

    return (

       <div className="container-xl">
            <div className="row justify-content-center mt-5">
            {loading? <h1>Loading....</h1>:(
                <div>
                {
                rooms && rooms.map(room => <div key={room._id} className="col-md-8 mb-5"><Card room={room} /></div>)
                }
                </div>
            ) }
            
        </div>

       </div>
    )
}

export default Home
