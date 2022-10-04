import axiosClient from "./axiosApi";

const criteriaApi = {
    getAll: (params) => {
        const url = '/criterias';
        return axiosClient.get(url, {
            params
        }) 
    }
}

export default criteriaApi