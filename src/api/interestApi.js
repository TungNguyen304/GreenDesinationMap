import axiosClient from "./axiosApi";

const interestApi = {
    getByUserid: (id) => {
        const url = `/wishList/getWishlistByUserId/${id}`
        return axiosClient.get(url)
    },
    add: (data) => {
        const url = `/wishList/addWishList`
        return axiosClient.post(url, data)
    },
    update: (data) => {
        const url = `/wishList/updateWishList`
        return axiosClient.put(url, data)
    },
    delete: (id) => {
        const url = `/wishList/deleteWishList/${id}`
        return axiosClient.delete(url)
    },
    addInterestPlace: (data) => {
        const url = `/wishlistItem/addWishlistItem`
        return axiosClient.post(url, data)
    },
    deleteInterestPlace: (id) => {
        const url = `/wishlistItem/deleteWishListItem/${id}`
        return axiosClient.delete(url)
    },
    getInterestPlace: (id) => {
        const url = `/getWishlistItemByWishlistId/${id}`
        return axiosClient.get(url)
    }
}



export default interestApi