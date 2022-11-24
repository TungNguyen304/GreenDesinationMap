import axiosClient from "./axiosApi";
const commentApi = {
    getAll: (params) => {
        const url = '/getcomments'
        return axiosClient.get(url, { 
            params
        })
    },
    postComment : (data, params) => {
        const url = '/comment/addComment'
        return axiosClient.post(url, data, { 
            params
        })
    }
}

export default commentApi