import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Error from '../components/Error/Error'
import Loading from '../components/Loading/Loading'
import { postAPICalls } from '../utils/APICalls'

const MyBooking = () => {
    const user = JSON.parse(localStorage.getItem('hotel_user'))
    const [bookings, setBookings] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const jwtToken = JSON.parse(localStorage.getItem('hotel_user')).token
    
    const getMyBookings=async()=>{
        try {
            setLoading(true)
            const {data} = await postAPICalls('bookings/my-bookings',{id: user._id}, jwtToken)
            setBookings(data)
            setLoading(false)
            console.log(data)
        } catch (error) {
            setLoading(false)
            setError(true)
            console.log(error)
        }
    }

    useEffect(()=>{
        getMyBookings()
    },[])

    const cancelBooking = async(bookingId, roomId) =>{
        
        try {
            setLoading(true)
            const {data} = await postAPICalls('bookings/cancel', {bookingId, roomId}, jwtToken);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(true)  
        }
    }
    return (
        <div>
            {loading && <Loading />}
            {error && <Error />}
            {bookings && bookings.map((booking)=> 
            <div className="card w-md-50 p-4 m-2" key={booking._id}>
               
                <h5>{booking.room}</h5>
                <p>{booking.fromDate} to {booking.toDate}</p>
                <p>Paid : <span>{booking.totalAmount}</span></p>
                 
                <strong className={booking.status==="booked" ? 'text-success':'text-danger'}>status: {booking.status==="booked" ? 'Confirmed': 'Canceld'}</strong>
               {booking.status==="booked" && 
               <button className="btn btn-danger" onClick={()=>cancelBooking(booking._id, booking.roomId)}>
                   Cancel
                </button>}
            </div>)}
        </div>
    )
}

export default MyBooking
