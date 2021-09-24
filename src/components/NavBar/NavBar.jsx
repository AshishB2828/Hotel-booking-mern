import React, {  } from 'react'
import {Link} from 'react-router-dom'
import GitHubIcon from '@material-ui/icons/GitHub';
import RoomIcon from '@material-ui/icons/Room';
import BookingsIcon from '@material-ui/icons/LibraryBooks';
import SingleBed from '@material-ui/icons/SingleBed';
import GroupIcon from '@material-ui/icons/Group';
import Account from '@material-ui/icons/AccountCircle';
import LogOutIcon from '@material-ui/icons/ExitToApp'

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
                <a className="navbar-brand fw-bold text-muted" href="/"><RoomIcon /> <span>HotelMotel</span></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                        <li className="nav-item ">
                            <a className="nav-link" href="https://github.com/AshishB2828/Hotel-booking-mern" target="_blank"><GitHubIcon className="nav-icon" /> <p>Git</p></a>
                         </li>
                {!user?.name ?<>
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                    </li></>: <>
                       { user.token && user.isAdmin &&<> <li className="nav-item">  
                        <Link className="nav-link" to="/all-bookings"><BookingsIcon className="nav-icon"/> <p>all-Bookings</p> </Link> </li>
                        <li className="nav-item">  
                        <Link className="nav-link" to="/all-rooms"> <SingleBed className="nav-icon"/><p> all-Rooms</p></Link> </li>
                        <li className="nav-item">  
                        <Link className="nav-link" to="/all-users"> <GroupIcon  className="nav-icon"/><p>Users</p></Link> </li>
                        </>
                        }
                        <li className="nav-item ">
                            <Link className="nav-link" to="/profile"><Account className="nav-icon"/> <p>{user.name}</p></Link>
                         </li>
                         <li></li>
                        <li className="nav-item"> 
                        <span className="nav-link" 
                        onClick={()=>logOut()}
                         style={{cursor: 'pointer'}} ><LogOutIcon className="nav-icon"/> <p>Logout</p> </span> 
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
