import axios from 'axios'

const baseUrl='http://localhost:3001/persons' 

const getAll =() =>{
    const request = axios.get(baseUrl)
    return request.then(response =>{
        return response.data
    })
}

const create = (person_obj) =>{
    const request = axios.post(baseUrl,person_obj)
    return request.then(response =>{
        return response.data
    })
}

const removePerson = (id) =>{
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response=>{
        return response.data
    })
}

const updatePerson =(id,person_object) =>{
    const request =axios.put(`${baseUrl}/${id}`,person_object)
    return request.then(response => {
        return response.data
    })
}

export default {getAll, create, removePerson, updatePerson}