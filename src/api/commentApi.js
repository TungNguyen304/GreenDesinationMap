import axiosClient from "./axiosApi";
const commentApi = {
    postComment : (data, params) => {
        console.log(data);
        const url = '/comment/addComment'
        return axiosClient.post(url, data, { 
            params
        })
    },
    getCommentByPlaceId: (id) => {
        const url = `/comment/getCommentByPlaceId/${id}`
        return axiosClient.get(url)
    },
    updateComment: (data) => {
        const url = `/comment/updateComment`
        return axiosClient.put(url, data)
    },
    deleteComment: (id) => {
        const url = `/comment/deleteComment/${id}`
        return axiosClient.delete(url)
    }
}

export default commentApi