import axiosClient from "./axiosApi";

const serviceApi = {
    getAll: (params) => {
        const url = '/place/information'
        return axiosClient.get(url, { 
            params
        })
    },
    getGreenService: (params) => {
        const url = '/place/approved'
        return axiosClient.get(url, { 
            params
        })
    },
    getById: (id) => {
        const url = `/place/${id}`
        return axiosClient.get(url)
    },
    getByUserId: (id) => {
        const url = `/place/findByUserId/${id}`
        return axiosClient.get(url)
    },
    addService: (data) => {
        console.log(data);
        const url = '/place/addPlace'
        return axiosClient.post(url, data)
    },
    delete: (id) => {
        console.log(id);
        const url = `/place/deletePlace/${id}`
        return axiosClient.delete(url)
    },
    updateService: (data) => {
        console.log(data);
        const url = '/place/updatePlace'
        return axiosClient.put(url, data)
    },
    getByWishListId: (id) => {
        const url = `/place/findPlacesByWishlistId/${id}`
        return axiosClient.get(url)
    }
}




export default serviceApi