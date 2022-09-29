import axiosClient from "./axiosApi";

const interestApi = {
    getAll: (params) => {
        const url = '/interests'
        return axiosClient.get(url, { 
            params
        })
    },
    get: (id, params) => {
        const url = `/interests/${id}`
        return axiosClient.get(url, { 
            params
        })
    },
    getListService: (params, query) => {
        const url = `/interests/${query}`
        return axiosClient.get(url, { 
            params
        })
    },
    push: (data) => {
        // const url = '/interests'
        // return axiosClient.post(url, data)
    },
    pushListService: (data, id) => {
        // const url = `/interests/service`
        // return axiosClient.post(url, data)
    },
    delete: (id) => {
        const url = `/interests/${id}`
        return axiosClient.delete(url)
    },
    deleteListService: ( query) => {
        const url = `/interests/${query}`
        return axiosClient.delete(url)
    }
}



export default interestApi