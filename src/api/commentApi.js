import axiosClient from "./axiosApi";
const commentApi = {
    getAll: (params) => {
        const url = '/getcomments'
        return axiosClient.get(url, { 
            params
        })
    }
}

export default commentApi