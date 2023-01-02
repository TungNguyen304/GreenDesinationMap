import axiosClient from "./axiosApi";

const criteriaApi = {
    getAll: (params) => {
        const url = '/criterias/getAllCriterias';
        return axiosClient.get(url, {
            params
        }) 
    },
    getByPlaceTypeId: (id, params) => {
        const url = `/criterias/getCriteriasByPlaceTypeId/${id}`;
        return axiosClient.get(url, {
            params
        })
    }
}

export default criteriaApi