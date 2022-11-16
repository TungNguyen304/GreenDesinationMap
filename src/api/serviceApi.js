import axiosClient from "./axiosApi";

const serviceApi = {
    getAll: (params) => {
        const url = '/place/information'
        return axiosClient.get(url, { 
            params
        })
    },
    getById: (id) => {
        const url = `/place/${id}`
        return axiosClient.get(url)
    },
    getByUserId: (id) => {
        const url = `/place/findByUserId/${id}`
        return axiosClient.get(url)
    },
    addService: (data) => {
        const url = '/place/addPlace'
        return axiosClient.post(url, data)
    },
    delete: (id) => {
        const url = `/place/deletePlace/${id}`
        return axiosClient.delete(url)
    }
}




export default serviceApi