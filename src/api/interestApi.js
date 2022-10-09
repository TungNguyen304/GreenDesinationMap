import axiosClient from "./axiosApi";

const interestApi = {
    getAll: (params) => {
        const url = '/getinterests'
        return axiosClient.get(url, { 
            params
        })
    },
    get: (id, params) => {
        const url = `/getinterests/${id}`
        return axiosClient.get(url, { 
            params
        })
    },
    getListService: (params, query) => {
        const url = `/getinterests/${query}`
        return axiosClient.get(url, { 
            params
        })
    },
    push: (data) => {
        // const url = '/getinterests'
        // return axiosClient.post(url, data)
    },
    pushListService: (data, id) => {
        // const url = `/getinterests/service`
        // return axiosClient.post(url, data)
    },
    delete: (id) => {
        const url = `/getinterests/${id}`
        return axiosClient.delete(url)
    },
    deleteListService: ( query) => {
        const url = `/getinterests/${query}`
        return axiosClient.delete(url)
    }
}



export default interestApi