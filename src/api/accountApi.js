import axiosClient from "./axiosApi";
const accountApi = {
    getAll: (params) => {
        const url = "/account"
        return axiosClient.get(url, {
            params
        })
    },
    update: (id) => {
        const url = `/account${id}`
        return axiosClient.put(url)
    },
    delete: (id) => {
        const url = `/account${id}`
        return axiosClient.delete(url)
    }
}
export default accountApi 