import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../components/card/Card'
import { DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css'
import { getAPICalls } from '../utils/APICalls';


const Home = () => {
    const [loading, setLoading] = useState(false)
    const [rooms, setRooms] = useState([])
    const [filterRooms, setFilterRooms] = useState([])
    const { RangePicker } = DatePicker;
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [search, setSearch] = useState('')
    const [type, setType] = useState('all')
    

    const getAllRooms = async () =>{
        setLoading(true)
        try {
            const {data} = await getAPICalls("rooms", null)
            setRooms(data.allrooms)
            setFilterRooms(data.allrooms)
            setLoading(false)
        } catch (error) {
            console.log(error.message)
        }
    }


    useEffect(()=>{
        getAllRooms()
    },[])

   const filterByDate= (dates)=>{
        if(!dates) return
        
       setFromDate(moment(dates[0]).format("DD-MM-YYYY"))
       setToDate(moment(dates[1]).format("DD-MM-YYYY"))
       let tempRooms = []
       let isAvailable=false ;
       for(const room of filterRooms) {
           
                if(room.currentbookings.length>0){
                   for( const booking of room.currentbookings){

                    console.log(booking.fromDate, booking.toDate)
                    // let new Date(dates[0]._d) = new Date(dates[0]._d)
                    // let new Date(dates[1]._d) = new Date(dates[1]._d)
                    if(
                        !((new Date(booking.fromDate).setHours(0,0,0,0)<=new Date(dates[0]._d).setHours(0,0,0,0)) && new Date(booking.toDate).setHours(0,0,0,0)>=new Date(dates[1]._d).setHours(0,0,0,0))
                        && !((new Date( booking.fromDate).setHours(0,0,0,0) >= new Date(dates[0]._d).setHours(0,0,0,0)) && new Date(dates[1]._d).setHours(0,0,0,0)>= new Date(booking.toDate).setHours(0,0,0,0))
                        && !((new Date( booking.fromDate).setHours(0,0,0,0) >= new Date(dates[0]._d).setHours(0,0,0,0)) && 
                                                    ((new Date(booking.fromDate).setHours(0,0,0,0)<=new Date(dates[1]._d).setHours(0,0,0,0)) && new Date(booking.toDate).setHours(0,0,0,0)>=new Date(dates[1]._d).setHours(0,0,0,0)))
                        && !((new Date( booking.fromDate).setHours(0,0,0,0) <= new Date(dates[1]._d).setHours(0,0,0,0)) &&
                                                                                (((new Date(booking.fromDate).setHours(0,0,0,0)<=new Date(dates[0]._d).setHours(0,0,0,0)) && new Date(booking.toDate).setHours(0,0,0,0)>=new Date(dates[0]._d).setHours(0,0,0,0)))
                        )
                    )
                    // if(!moment(fromDate).isBetween(booking.fromDate, booking.toDate)
                    // && !moment(toDate).isBetween(booking.fromDate, booking.toDate)
                    // )
                    {

                            if (

                                new Date(dates[0]._d).setHours(0,0,0,0) !==new Date(booking.fromDate).setHours(0,0,0,0) &&
                                new Date(dates[0]._d).setHours(0,0,0,0) !==new Date(booking.toDate).setHours(0,0,0,0) &&
                                new Date(dates[1]._d).setHours(0,0,0,0) !== new Date(booking.fromDate ).setHours(0,0,0,0)&&
                                new Date(dates[1]._d).setHours(0,0,0,0) !== new Date(booking.toDate ).setHours(0,0,0,0)
                            ){
                                isAvailable =true
                                console.log("avi;")
                            }
                    }else{
                        isAvailable = false
                    }
                   }
                }
                if(isAvailable === true || room.currentbookings.length === 0){
                    tempRooms.push(room)
                }
                setRooms(tempRooms)
           
         
        };
        

   }

   const filterBySearch =()=>{

    const tempRooms =filterRooms.filter(room=>room.name.toLowerCase().includes(search.toLowerCase()))
    setRooms(tempRooms)
   }

   const filterByType =(val)=>{
       setType(val)
       if(val ==='all')
       return setRooms(filterRooms)
        const temprooms = filterRooms.filter(room => room.type.toLowerCase() == val.toLowerCase())
        setRooms(temprooms)
   }
    return (

       <div className="wrapper__main">
                <h3>Find your fav rooms</h3>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-3">
                        {/* <Space direction="vertical" size={12}> */}
                        <RangePicker
                        className="form-control"
                         format="DD-MM-YYYY"
                        onChange={ filterByDate}
                         />
                        {/* </Space> */}
                    </div>
                    <div className="col-md-3">
                        <input 
                            className="form-control" 
                            placeholder="search rooms" 
                            type="text"
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            onKeyUp={filterBySearch}
                             />
                    </div>

                    <div className="col-md-3" value={type} onChange={e=> filterByType(e.target.value)}>
                    <select name="" id="" className="form-control">
                        <option value="all">All</option>
                        <option value="delux">Delux</option>
                        <option value="nondelux">Non-Delux</option>
                    </select>
                    </div>
                   
                </div>
                <h4 >Available rooms</h4>
                 <hr/>
            <div className=" justify-content-center mt-5">
            {loading? <h1>Loading....</h1>:(
                <div className="row justify-content-center">
                {
                rooms && rooms.map(room => <div key={room._id} className="col-md-3 mb-5">
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
