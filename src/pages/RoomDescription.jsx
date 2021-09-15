import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import Loading from '../components/Loading/Loading'
import Error from '../components/Error/Error'

const RoomDescription = () => {
    const {roomId} =useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [room, setRoom] = useState({})

    const getRoom = async (roomId) => {
        setLoading(true)
        try {
            const {data} = await axios.get(`/api/rooms/${roomId}`)
            setRoom(data.room)
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            setLoading(false)
            setError(true)
        }
    }

    useEffect(()=>{
       getRoom(roomId)
    },[])
    return (
        <div className="container">
            {loading?<Loading />:error?<Error/>:(
                <div>
                    <div className="row justify-content-center mt-5 border-2 border">
                        <div className="col-md-5">
                            {room.name}
                            <img src={room.imageurls[0]} className="bigimg" />
                        </div>

                        <div className="col-md-5 " style={{textAlign:'right'}}>
                            <div>
                                <h1>Booking Details</h1>
                                <hr />
                                <p>Name: Ashish B</p>
                                <p>From Date : </p>
                                <p>To Date : </p>
                                <p>Max count :3 </p>
                            </div>
                            <div>
                                <h1>Amount: </h1>
                                <hr />
                                <p>Total days: </p>
                                <p>Rent per day: </p>
                                <p>Total amount: </p>
                            </div>
                            <div>
                                <button className="btn btn-primary">Pay now</button>
                            </div>
                        </div>

                        
                    </div>

                </div>)}
        </div>
    )
}

export default RoomDescription
