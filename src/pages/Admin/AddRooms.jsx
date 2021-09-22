import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Loading from '../../components/Loading/Loading'

const AddRooms = () => {


    const [name, setName] = useState('')
    const [maxcount, setMaxCount] = useState(0)
    const [rentperday, setRentperday] = useState(0)
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [phonenumber, setPhonenumber] = useState(0)
    const [imageurls1, setImageurls1] = useState("")
    const [imageurls2, setImageurls2] = useState("")
    const [imageurls3, setImageurls3] = useState("")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleSubmit = async() => {
        const newRoom = {
            name, maxcount, rentperday, 
            description,type, phonenumber, 
            imageurls:[imageurls1, imageurls2, imageurls3]
        }

        try {
            setLoading(true)
            const {data} = await axios.post('/api/rooms/add', newRoom)
            setLoading(false)
            Swal.fire('Congradulation', 'New Room Added', "success").then(
                result=> window.location.reload()
            )
        } catch (error) {
            setLoading(false)
            console.log(error.response)
            setError(true)
            Swal.fire('Oops', 'Something Went Wrong', "error")
            
        }
    }


    return (
        <div  className="mt-5">
        { loading && <Loading />}
        
            <div className="row ">
                <div className="col-md-5">
                <input type="text" className="form-control mt-4" placeholder="Room Name" 
                value={name}
                onChange={e=>setName(e.target.value)}
                 />
                <input type="number" className="form-control mt-4" placeholder="max-count"
                value={maxcount} onChange={e=>setMaxCount(e.target.value)} />
                <input type="number" className="form-control mt-4 " placeholder="phone"
                    value ={phonenumber} onChange={e=>setPhonenumber(e.target.value)}
                />
                <input type="number" className="form-control mt-4 " placeholder="Rent/Day"
                    value={rentperday} onChange={e=>setRentperday(e.target.value)}
                />
                <input type="text" className="form-control mt-4 " placeholder="type"
                    value={type} onChange={e=>setType(e.target.value)}
                />
                </div>
                <div className="col-md-5">
                <input type="text" className="form-control mt-4" placeholder="Description"
                value={description} onChange={e=>setDescription(e.target.value)}/>
                <input type="text" className="form-control mt-4 " placeholder="image"
                    value={imageurls1} onChange={e=>setImageurls1( e.target.value)}
                />
                <input type="text" className="form-control mt-4" placeholder="image" 
                    value={imageurls2} onChange={e=>setImageurls2( e.target.value)}
                />
                <input type="text" className="form-control mt-4 " placeholder="image"
                    value={imageurls3} onChange={e=>setImageurls3( e.target.value)}
                />
                <button disabled={loading} className="btn btn-success mt-4 w-100"
                onClick={handleSubmit}
                >Add</button>
                </div>
            </div>
        </div>
    )
}

export default AddRooms
