import axiosClient from "./axiosApi";

const criteriaApi = {
    getAll: (params) => {
        const url = '/getcriterias';
        return axiosClient.get(url, {
            params
        }) 
    }
}

export default criteriaApi