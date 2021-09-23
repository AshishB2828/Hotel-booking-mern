import axios from 'axios'

export const getAPICalls =async(url, token) =>{

   const response = await axios.get(`/api/${url}/`, {headers:{
       Authorization: `Bearer ${token}`
   }})

   return response
}

export const postAPICalls =async(url, data, token) =>{

    const response = await axios.post(`/api/${url}/`,data, {headers:{
        Authorization: `Bearer ${token}`
    }})
    return response
}