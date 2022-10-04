import axiosClient from "./axiosApi";

const serviceApi = {
    getAll: (params) => {
        const url = '/services'
        return axiosClient.get(url, { 
            params
        })
    },
    get: (id) => {
        const url = `/services/${id}`
        return axiosClient.get(url)
    },
    push: (data) => {
        const url = '/services'
        return axiosClient.post(url, data)
    },
    delete: (id) => {
        const url = `/services/${id}`
        return axiosClient.delete(url)
    }
}




export default serviceApi