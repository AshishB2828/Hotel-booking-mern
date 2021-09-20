import React, { useState } from 'react'
import{Link} from 'react-router-dom'
import Modals from '../Modal/Modal'

const Card = ({room, fromDate, toDate}) => {
    const [modalShow, setModalShow] = useState(false)
   
    return (
        <div className="row card__room border-1 border rounded-3 p-3">
           <div className="col-md-4">
                <img src={room.imageurls[0]} className="smallimg" />
           </div>
           <div className="col-md-8 card__text">
                <h2>{room.name}</h2>
                <p>Max count: {room.maxcount}</p>
                <p>phone: {room.phonenumber}</p>
                <p>Type: {room.type}</p>
                
                <div>
                    <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
                    <button className="btn btn-dark mx-2 float-end">Book now</button>
                    </Link>
                    <button onClick={() => setModalShow(true)} className="btn btn-dark float-end">view details</button>
                </div>
           </div>
            <Modals 
            room={room}
            show={modalShow}
            onHide={() => setModalShow(false)} />

        </div>
    )
}

export default Card
