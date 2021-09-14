import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

const RoomDescription = () => {
    const {roomId} =useParams()
    const [loading, setLoading] = useState(false)
    const [room, setRoom] = useState({})

    const getRoom = async (roomId) => {
        setLoading(true)
        try {
            const {data} = await axios.get(`/api/rooms/${roomId}`)
            setRoom(data.room)
            setLoading(false)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
       getRoom()
    },[])
    return (
        <div>
            
        </div>
    )
}

export default RoomDescription
