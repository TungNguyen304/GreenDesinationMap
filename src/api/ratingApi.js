import axiosClient from "./axiosApi";

const ratingApi = {
    getRatingByUserid: (placeid, userid, params) => {
        const url = `/rating/getRatingByPlaceIdAndUserId/${placeid}/${userid}`
        return axiosClient.get(url, {params})
    },
    postRating: (data) => {
        const url = "/rating/addRating"
        return axiosClient.post(url, data)
    },
    updateRating: (data) => {
        const url = "/rating/updateRating"
        return axiosClient.put(url, data)
    }
}

export default ratingApi