import axiosClient from "./axiosApi";

const imageApi = {
    getAll: (params) => {
        const url = "/getimages"
        return axiosClient.get(url, {
            params
        })
    },
    get: (id, params) => {
        const url = `/img/image/${id}`
        return axiosClient.get(url, {
            params
        })
    } 
}

export default imageApi