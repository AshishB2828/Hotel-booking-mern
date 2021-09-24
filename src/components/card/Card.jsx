import React, { useState } from 'react'
import{Link} from 'react-router-dom'
import Modals from '../Modal/Modal'

const Card = ({room, fromDate, toDate}) => {
    const [modalShow, setModalShow] = useState(false)
   
    return (

        <div className="card__container">
        <img src={room.imageurls[0]} 
        alt="" className="card__img"/>
        <div className="card__body">
            <h2 className="card__title">{room.name.substring(0,20)}...</h2>
            <p className="card__price">Rs.<span>{room.rentperday}</span></p>
            <p className="card__type">type: {room.type}</p>
            <div className="btns">
                <button  onClick={() => setModalShow(true)} className="card__btn">view details</button>
                {fromDate && toDate && 
                 <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
                  <button className="card__btn mx-2">Book now</button>
                  </Link>}
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
