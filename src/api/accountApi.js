import axiosClient from "./axiosApi";
const accountApi = {
    getAll: (params) => {
        const url = `/getaccounts`
        return axiosClient.get(url, {
            params
        })
    },
    getLogin: (token) => {
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const url = "/user/userInfor"
        return axiosClient.get(url)
    },
    get: (id) => {
        const url = `/getaccounts/${id}`
        return axiosClient.get(url)
    },
    update: (data) => {
        const url = `/user/update`
        return axiosClient.put(url, data)
    },
    verify: (data) => {
        const url = '/user/updatePassword'
        return axiosClient.post(url, data)
    },
    delete: (id) => {
        const url = `/getaccounts${id}`
        return axiosClient.delete(url)
    },
    post: (data) => {
        console.log(data);
        const url = `/api/login`
        return axiosClient.post(url, data)
    },
    register: (data) => {
        const url = '/user/register'
        return axiosClient.post(url, data)
    }
}
export default accountApi 