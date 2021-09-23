import React, { useEffect, useState } from 'react'
import StripeCheckOut from 'react-stripe-checkout'
import moment from 'moment'
import Swal from 'sweetalert2'
import {getAPICalls, postAPICalls} from '../utils/APICalls'
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
    let loggedInUser = JSON.parse(localStorage.getItem('hotel_user'))
    const jwtToken = JSON.parse(localStorage.getItem('hotel_user'))?.token

    const totalDays = moment.duration(toDate.diff(fromDate)).asDays()+1
    const getRoom = async (roomId) => {
        setLoading(true)
        try {
            const {data} = await getAPICalls(`rooms/${roomId}`, null)
            setRoom(data.room)
            setLoading(false)
            
        } catch (error) {

            setLoading(false)
            setError(true)
        }
    }
    
    useEffect(()=>{
        if(!loggedInUser) window.location.href = '/login'
        getRoom(roomId)
        setTotalAmount(totalDays*room?.rentperday)
    },[roomId, room?.rentperday, totalDays])

    const onToken = async(token)=>{

        const bookingDetails = {
            room:room?.name,
            roomId,
            userId: JSON.parse(localStorage.getItem('hotel_user'))._id,
            fromDate : new Date(fromDate._d).toDateString(),
            toDate: new Date(toDate._d).toDateString(),
            totalDays,
            totalAmount,
            token
        }

        try {
            setLoading(true)
            const {data} = await postAPICalls('bookings/bookroom', bookingDetails, jwtToken)
            Swal.fire('Congratulations', 'Your Room Booked Successfully','success').then(
                result => window.location.href="/bookings"
            )
          
            setLoading(false)
        } catch (error) {
            setLoading(false)
           
            Swal.fire('Error', 'Something went wrong','error')
        }
    }

    return (
        <div className="wrapper__main">
            {loading?<Loading />:error?<Error/>:(
                <div>
                    <div >
                        <h1 className="text-start fs-2 text-muted mx-md-5 mt-4">{room.name}</h1>
                        <div className="row justify-content-center">
                            <div className="col-md-7 b p-4">
                                <img src={room.imageurls[0]} alt="" className="img-fluid"/>
                                <div className="row justify-content-center p-2">
                                <img src={room.imageurls[0]} alt="" className="img-fluid col-3"/>
                                <img src={room.imageurls[1]} alt="" className="img-fluid col-3"/>
                                <img src={room.imageurls[2]} alt="" className="img-fluid col-3"/>
                                </div>
                            </div>
                            <div className="col-md-5 px-1 px-md-4 text-start">
                                <p>{room.description}</p>
                                <p>contact: {room.phonenumber}</p>
                                <div className="">
                                    <h2>Booking details</h2>
                                    <p>Name: {loggedInUser?.name}</p>
                                    <p>From Date : {fromDate._i}</p>
                                    <p>To Date : {toDate._i}</p>
                                    <p>Max count :3 </p>
                                </div>
                              
                                <div>
                                    <h1>Payment </h1>
                                    <p>Total days: {totalDays} </p>
                                    <p>Rent per day: {room.rentperday} </p>
                                    <p>Total amount: <strong>{totalAmount}</strong> </p>
                                </div>
                                <div>
                               
                                <StripeCheckOut
                                token={onToken}
                                currency="INR"
                                amount={totalAmount * 100}
                                stripeKey={process.env.REACT_APP_STRIPE}
                                >
                                <button 
                                className="card__btn"
                                >Pay now</button>
                                </StripeCheckOut>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>
    )
}

export default RoomDescription
