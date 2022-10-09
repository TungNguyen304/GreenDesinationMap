import axiosClient from "./axiosApi";

const serviceApi = {
    getAll: (params) => {
        const url = '/getservices'
        return axiosClient.get(url, { 
            params
        })
    },
    get: (id) => {
        const url = `/getservices/${id}`
        return axiosClient.get(url)
    },
    push: (data) => {
        const url = '/getservices'
        return axiosClient.post(url, data)
    },
    delete: (id) => {
        const url = `/getservices/${id}`
        return axiosClient.delete(url)
    }
}




export default serviceApi