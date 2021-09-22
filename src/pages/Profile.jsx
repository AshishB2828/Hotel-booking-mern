import React, { useEffect } from 'react'

import MyBooking from './MyBooking'

const Profile = () => {
    return (
        <div>
           <div className="container">
           <h1 className="my-4 text-muted">My Bookings</h1>
                <MyBooking/>
           </div>
        </div>
    )
}

export default Profile

