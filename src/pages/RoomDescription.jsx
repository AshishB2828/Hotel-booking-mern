import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import moment from 'moment'
import Loading from '../components/Loading/Loading'
import Error from '../components/Error/Error'

const RoomDescription = ({match}) => {
    const roomId =match.params.roomId
    const fromDate =moment(match.params.fromDate, 'DD-MM-YYYY')
    const toDate =moment(match.params.toDate, 'DD-MM-YYYY')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [room, setRoom] = useState({})
    const [totalAmount, setTotalAmount] = useState(0)
    let loggedInUser = JSON.parse(localStorage.getItem('hotel_user'))?.name

    const totalDays = moment.duration(toDate.diff(fromDate)).asDays()+1
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
        setTotalAmount(totalDays*room?.rentperday)
    },[roomId, room?.rentperday])

    const handleBookRoom = async()=>{

        const bookingDetails = {
            room:room?.name,
            roomId,
            userId: JSON.parse(localStorage.getItem('hotel_user'))._id,
            fromDate : new Date(fromDate._d).toDateString(),
            toDate: new Date(toDate._d).toDateString(),
            totalDays,
            totalAmount,
        }

        try {
            const {data} = await axios.post('/api/bookings/bookroom', bookingDetails)
            console.log(data)
        } catch (error) {
            console.log(error.response)
        }
    }

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
                                <p>Name: {loggedInUser}</p>
                                <p>From Date : {fromDate._i}</p>
                                <p>To Date : {toDate._i}</p>
                                <p>Max count :3 </p>
                            </div>
                            <div>
                                <h1>Amount: </h1>
                                <hr />
                                <p>Total days: {totalDays} </p>
                                <p>Rent per day: {room.rentperday} </p>
                                <p>Total amount: {totalAmount} </p>
                            </div>
                            <div>
                                <button 
                                className="btn btn-primary"
                                onClick={handleBookRoom}
                                >Pay now</button>
                            </div>
                        </div>

                        
                    </div>

                </div>)}
        </div>
    )
}

export default RoomDescription
