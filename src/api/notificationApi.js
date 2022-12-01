import axiosClient from "./axiosApi";

const notificationApi = {
    getByUser: (id) => {
        const url = `/notification/getByUserId/${id}`
        return axiosClient.get(url)
    },
    update: (id) => {
        const url = `/notification/updateStatus/${id}`
        return axiosClient.get(url)
    }
}

export default notificationApi