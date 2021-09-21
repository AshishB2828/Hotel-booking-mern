import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {
   const user =JSON.parse(localStorage.getItem('hotel_user'))
    const logOut = () => {
        localStorage.removeItem('hotel_user')
        window.location.href='/'
    }

    return (
        <div>
           <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">HotelMotel</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                {!user?.name ?<>
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                    </li></>: <>
                        <li className="nav-item">  
                        <Link className="nav-link" to="/bookings">Bookings</Link> </li>
                        <li className="nav-item ">
                            <Link className="nav-link" to="/profile"> {user.name}</Link>
                         </li>
                        <li className="nav-item"> 
                        <span className="nav-link" 
                        onClick={()=>logOut()}
                         style={{cursor: 'pointer'}} >Logout</span> 
                         </li>
                    </>}
                </ul>
                </div>
            </div>
            </nav>
        </div>
    )
}

export default NavBar
