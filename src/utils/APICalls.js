import axios from 'axios'
const BASE_URL="https://hotelmotel-server.herokuapp.com"
export const getAPICalls =async(url, token) =>{

   const response = await axios.get(`${BASE_URL}/api/${url}/`, {headers:{
       Authorization: `Bearer ${token}`
   }})

   return response
}

export const postAPICalls =async(url, data, token) =>{

    const response = await axios.post(`${BASE_URL}/api/${url}/`,data, {headers:{
        Authorization: `Bearer ${token}`
    }})
    return response
}