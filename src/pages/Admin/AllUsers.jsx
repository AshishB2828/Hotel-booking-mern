import React, { useEffect, useState } from 'react'
import Error from '../../components/Error/Error'
import Loading from '../../components/Loading/Loading'
import axios from 'axios'
import { getAPICalls } from '../../utils/APICalls'
const AllUsers = () => {
    
    const jwtToken = JSON.parse(localStorage.getItem('hotel_user')).token
    const [users, setUsers] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const getAllUsers = async() => {

        try {
            setLoading(true)
           const{data} = await getAPICalls('auth/all-user', jwtToken)
            setUsers(data)
            setLoading(false)
            setError(false)

        } catch (error) {
            setLoading(false)
            setError(true)
            console.log(error.response)
        }
    }

    useEffect(()=>{
        getAllUsers()
    },[])

    return (
        <div  className="container">
       <div  className="mt-4">
        { loading && <Loading />}
        {error && <Error />} 
       </div>
            <h1>users</h1>
            {users && <p>There are total {users.length} users</p>}
            <table className="table table-bordered table-dark">
                <thead  className="bs thead-dark">
                    <tr>
                        <th>User ID</th>
                        <th>Name </th>
                        <th>Email</th>
                        <th> Admin</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map(user=>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin? "True": "False"}</td>
                                
                                
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllUsers

