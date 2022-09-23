import axiosClient from "./axiosApi";
const commentApi = {
    getAll: (params) => {
        const url = '/comments'
        return axiosClient.get(url, { 
            params
        })
    }
}

export default commentApi