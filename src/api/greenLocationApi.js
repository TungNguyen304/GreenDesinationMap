import axiosClient from "./axiosApi";
const greenLocationApi = {
    getAll: (params) => {
        const url = '/listService'
        return axiosClient.get(url, { 
            params
        })
    }
}

export default greenLocationApi