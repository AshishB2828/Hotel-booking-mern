import React, { useEffect, useState } from 'react'
import Error from '../../components/Error/Error'
import Loading from '../../components/Loading/Loading'
import axios from 'axios'
import { getAPICalls } from '../../utils/APICalls'
const AllBookings = () => {

    const jwtToken = JSON.parse(localStorage.getItem('hotel_user')).token
    const [bookings, setBookings] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const getAllBookings = async() => {

        try {
            setLoading(true)
           const{data} = await getAPICalls('bookings/all-bookings', jwtToken)
            setBookings(data)
            setLoading(false)
            setError(false)

        } catch (error) {
            setLoading(false)
            setError(true)
            console.log(error.response)
        }
    }

    useEffect(()=>{
        getAllBookings()
    },[])

    return (
        <div  className="container">
       <div  className="mt-4">
        { loading && <Loading />}
        {error && <Error />} 
       </div>
            <h1>Bookings</h1>
            {bookings && <p>There are total {bookings.length} bookings</p>}
            <table className="table table-bordered table-dark">
                <thead  className="bs thead-dark">
                    <tr>
                        <th>Booking ID</th>
                        <th>User ID</th>
                        <th>Room </th>
                        <th>From ID</th>
                        <th>To </th>
                        <th>Staus</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings && bookings.map(booking=>(
                            <tr key={booking._id}>
                                <td>{booking._id}</td>
                                <td>{booking.userId}</td>
                                <td>{booking.room}</td>
                                <td>{booking.fromDate}</td>
                                <td>{booking.toDate}</td>
                                <td>{booking.status}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllBookings

