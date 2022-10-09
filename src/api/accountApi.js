import axiosClient from "./axiosApi";
const accountApi = {
    getAll: (params) => {
        const url = "/getaccounts"
        return axiosClient.get(url, {
            params
        })
    },
    get: (id) => {
        const url = `/getaccounts/${id}`
        return axiosClient.get(url)
    },
    update: (id) => {
        const url = `/getaccounts${id}`
        return axiosClient.put(url)
    },
    delete: (id) => {
        const url = `/getaccounts${id}`
        return axiosClient.delete(url)
    }
}
export default accountApi 