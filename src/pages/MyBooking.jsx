import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Error from '../components/Error/Error'
import Loading from '../components/Loading/Loading'

const MyBooking = () => {
    const user = JSON.parse(localStorage.getItem('hotel_user'))
    const [bookings, setBookings] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const getMyBookings=async()=>{
        try {
            setLoading(true)
            const {data} = await axios.post('/api/bookings/my-bookings',{id: user._id})
            setBookings(data)
            setLoading(false)
            console.log(data)
        } catch (error) {
            setLoading(false)
            setError(true)
            console.log(error.response)
        }
    }

    useEffect(()=>{
        getMyBookings()
    },[])

    const cancelBooking = async(bookingId, roomId) =>{
        
        try {
            setLoading(true)
            const {data} = await axios.post('/api/bookings/cancel', {bookingId, roomId});
            console.log(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(true)
            console.log(error.response)
            
        }
    }
    return (
        <div>
            {loading && <Loading />}
            {error && <Error />}
            {bookings && bookings.map((booking)=> <div className="card p-4 m-2" key={booking._id}>
                <h5>{booking.room}</h5>
                Paid : <h5>{booking.totalAmount}</h5>
                <strong>status: {booking.status==="booked" ? 'Confirmed': 'Canceld'}</strong>
               {booking.status==="booked" && 
               <button className="btn btn-primary" onClick={()=>cancelBooking(booking._id, booking.roomId)}>
                   Cancel
                </button>}
            </div>)}
        </div>
    )
}

export default MyBooking
