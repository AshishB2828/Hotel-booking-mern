import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../components/card/Card'
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css'


const Home = () => {
    const [loading, setLoading] = useState(false)
    const [rooms, setRooms] = useState([])
    const { RangePicker } = DatePicker;
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    

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

   const filterByDate= (dates)=>{
       setFromDate(moment(dates[0]).format('DD-MM-YYYY'))
       setToDate(moment(dates[1]).format('DD-MM-YYYY'))
   }

    return (

       <div className="container">

                <div className="row mt-5">
                    <div className="col-md-3">
                        {/* <Space direction="vertical" size={12}> */}
                        <RangePicker
                         format="DD-MM-YYYY"
                        onChange={ filterByDate}
                         />
                        {/* </Space> */}
                    </div>
                </div>
            <div className="row justify-content-center mt-5">
            {loading? <h1>Loading....</h1>:(
                <div>
                {
                rooms && rooms.map(room => <div key={room._id} className="col-md-8 mb-5">
                                    <Card 
                                    room={room}
                                    fromDate={fromDate}
                                    toDate={toDate}
                                     /></div>)
                }
                </div>
            ) }
            
        </div>

       </div>
    )
}

export default Home
