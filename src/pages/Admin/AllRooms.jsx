import React, { useEffect, useState } from 'react'
import Error from '../../components/Error/Error'
import Loading from '../../components/Loading/Loading'
import axios from 'axios'
import AddRooms from './AddRooms'
const AllRooms = () => {

    const [rooms, setRooms] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [addRoom, setAddRoom] = useState(false)

    const getAllRooms = async() => {

        try {
            setLoading(true)
           const{data} = await axios.get('/api/rooms/')
    
            setRooms(data.allrooms)
            setLoading(false)
            setError(false)

        } catch (error) {
            setLoading(false)
            setError(true)
            console.log(error.response)
        }
    }

    useEffect(()=>{
        getAllRooms()
    },[])

    return (
        <div  className="container">
       <div  className="mt-4">
        { loading && <Loading />}
        {error && <Error />} 
        <div>
        <button 
        onClick={()=>setAddRoom(!addRoom)}
        className={`btn btn-${addRoom? 'danger':'success'} `}>
        {addRoom ? "Cancel" : "Add Room"}</button>
       
            {addRoom && <AddRooms />}
        </div>
       </div>
            {!addRoom && <h1 className="mt-4">Rooms</h1>}
            {!addRoom && rooms && <p>There are total {rooms.length} rooms</p>}
            {!addRoom && <table className="table table-bordered table-dark">
                <thead  className="bs thead-dark">
                    <tr>
                        <th>Room ID</th>
                        <th>Name </th>
                        <th>Rent</th>
                        <th>Total Bookings </th>
                        <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rooms && rooms.map(rooms=>(
                            <tr key={rooms._id}>
                                <td>{rooms._id}</td>
                                <td>{rooms.name}</td>
                                <td>{rooms.rentperday}</td>
                                <td>{rooms.currentbookings.length}</td>
                                <td>{rooms.phonenumber}</td>
                                
                            </tr>
                        ))
                    }
                </tbody>
            </table>}
        </div>
    )
}

export default AllRooms

    

