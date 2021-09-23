import React, { useState } from 'react'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import Error from '../../components/Error/Error'
import { postAPICalls } from '../../utils/APICalls'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const handleLogin =()=>{

        if(password && email){
            const user ={email,password}
           userLogin(user)
        }else{
            alert("Please enter something")
        }
    }

    const userLogin =async(user)=>{
        try {
            setLoading(true)
            const {data} = await postAPICalls('auth/login', user)
            setLoading(false)
            localStorage.setItem('hotel_user', JSON.stringify(data))
            window.location.href='/'
            console.log(data)

        } catch (error) {
            console.log(error.response)
            setError(true)
            setLoading(false)
        }
    }

    return (
        <div>
        { loading && <Loading />}
        {error && <Error />}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5">
                    <div>
                        <h1>Login</h1>

                        <div className="m-2">
                            <input type="email" className="form-control" placeholder="email"
                            value ={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="m-2">
                            <input type="password" className="form-control" placeholder="password"
                            value ={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />   
                        </div>


                        <div className="m-2">
                            <button className="btn btn-primary"
                            disabled={loading}
                            onClick={handleLogin}
                            >Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
