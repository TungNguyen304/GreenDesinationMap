import axiosClient from "./axiosApi";

const imageApi = {
    getAll: (params) => {
        const url = "/images"
        return axiosClient.get(url, {
            params
        })
    },
    get: (id, params) => {
        const url = `/images${id}`
        return axiosClient.get(url, {
            params
        })
    } 
}

export default imageApi