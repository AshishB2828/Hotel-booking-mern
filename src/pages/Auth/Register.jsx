import React, { useState } from 'react'
import Loading from '../../components/Loading/Loading'
import Error from '../../components/Error/Error'
import Success from '../../components/Success/Success'
import { postAPICalls } from '../../utils/APICalls'

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const handleRegister =()=>{

        if(password===confirmPassword){
            const user ={name,email,password}
            userRegister(user)
        }else{
            alert("password do not match")
        }
    }
    const userRegister =async(user)=>{
        try {
            setLoading(true)
            const {data} = await postAPICalls('auth/register', user)
            setLoading(false)
            setSuccess(true)
        } catch (error) {
            console.log(error.response)
            setLoading(false)
            setErrorMsg(error.response?.data?.message)
            setError(true)
        }
    }
    return (
        <div>
            { loading && <Loading />}
            {error && <Error msg={errorMsg}/>}
            {success && <Success message={'registration success'} />}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 my-4">
                    <div>
                        <h1 className="text-muted text-start">Register</h1>
                        <div className="m-2">
                            <input type="text" className="form-control" placeholder="name"
                            value ={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
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
                            <input type="password" className="form-control" placeholder="confirm password"
                            value ={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div className="m-2">
                            <button className="btn card__btn w-100"
                            disabled ={loading}
                            onClick={handleRegister}
                            >Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
