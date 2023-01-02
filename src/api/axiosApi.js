import { data } from "autoprefixer";
import avatarFirebase from "../firebase/avatar";
import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        //  Authorization: `<Your Auth Token>`,
            "Content-Type": "application/json;charset=utf-8",
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Methods": "*",
            // "Access-Control-Allow-Credentials": "true",
            // "Access-Control-Allow-Headers": "*"
    },
})
axiosClient.interceptors.request.use(function (request) {
    // Do something before request is sent
    return request;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axiosClient.interceptors.response.use(function (response) {
    function create(id,mapid,userid,name,road,ward,district,city,phone,address,type,lat,lon,star,host,description,startday,status,browserday, useravt, criteriaList, imagesCollection, commentsCollection, wishList){
        return {id,mapid, userid, name, road, ward, district, city, phone, address, type, lat, lon, star, host, description, startday, status, browserday, useravt, criteriaList, imagesCollection, commentsCollection, wishList}
    }

    function comment(id, userid, username, content, image, date, entireDate) {
        return {id, userid, username, content, image, date, entireDate}
    }

    if(response.request.responseURL === 'http://localhost:8080/user/userInfor') {
        const data = {
            ...response.data,
            image: response.data.avatar,
            gender: response.data.gender ? 'Male' : 'FeMale',
            id: response.data.userid,
            role: response.data.roleid.role,
            startdate: new Date(response.data.startdate).toLocaleDateString("vi-VN")
        }
        delete data.userid
        delete data.roleid
        delete data.avatar
        return {
            data: data
        }
    }
    else if((response.request.responseURL.includes(`http://localhost:8080/place/findByUserId/`)) || 
    response.request.responseURL === 'http://localhost:8080/place/information' || response.request.responseURL === 'http://localhost:8080/place/approved' || response.request.responseURL.includes(`http://localhost:8080/place/findPlacesByWishlistId/`)) {
        if(response.data) {
            const data = response.data.map((e) => {
                const startday = new Date(e.startday).toLocaleDateString("vi-VN")
                const browserday = e.browserday ? new Date(e.browserday).toLocaleDateString("vi-VN") : null
                const newImageList = e.imagesCollection.map((item) => ({
                    "id": item.imageid,
                    "name": item.imagename,
                    "key": item.imagekey
                }))
                const wishList = response.request.responseURL.includes(`http://localhost:8080/place/findPlacesByWishlistId/`) || response.request.responseURL === 'http://localhost:8080/place/information'
                ? e.wishListItemsCollection.map((item) => {
                    return {
                        userid: item.wishListsModel.userModel.userid,
                        id: item.wishlistitemid
                    }
                }) : []

                const address = (e.road ? e.road + ", " : "") + (e.ward ? e.ward + ", " : "") + (e.district ? e.district : "");
                return create(e.placeid, e.mapid, e.userid.userid, e.placename, e.road, e.wrad, e.district, e.city, e.phone, address, 
                e.placetypeid.type, e.lat, e.lon, e.star, e.userid.username, e.description, startday, e.status, browserday, e.userid.avatar, e.ratingsCollection, newImageList, [], wishList)
            })
            return {
                data: data
            }
        }
        return response
    }
    else if(response.request.responseURL === `http://localhost:8080/place/${response.data.placeid}`) {
        const e = response.data
        const startday = new Date(e.startday).toLocaleDateString("vi-VN")
        const browserday = new Date(e.browserday).toLocaleDateString("vi-VN")
        const wishList = e.wishListItemsCollection.map((item) => {
            return item.wishListsModel.userModel.userid
        })
        return {
            data: create(e.placeid, e.mapid, e.userid.userid, e.placename, e.road, e.wrad, e.district, e.city, e.phone, e.road + ", " + e.ward + ", " + e.district, 
            e.placetypeid.type, e.lat, e.lon, e.star, e.userid.username, e.description, startday, e.status, browserday, e.userid.avatar, e.ratingsCollection, e.imagesCollection, e.commentsCollection, [])
        }
    } 
    else if(response.request.responseURL.includes(`http://localhost:8080/img/image/`) && response.config.method === "get") {
        const data = response.data.map((e) => {
            return {
                id: e.imageid,
                name: e.imagename,
                key: e.imagekey
            }
        })
        return {
            data: data
        }
    } else if(response.request.responseURL.includes(`http://localhost:8080/criterias/getCriteriasByPlaceTypeId/`) && response.config.method === "get"){
        function create(id, name, actor) {
            return {id, name, actor}
        }
        const data = response.data.map((e) => {
            return create(e.criteriaid, e.criterianame, e.actor)
        })
        return {
            data: data
        }
    } else if(response.request.responseURL.includes('http://localhost:8080/comment/getCommentByPlaceId')) {
        const commentList = response.data.map((item) => {
            return comment(item.commentid, item.userModel.userid, item.userModel.username, item.content, item.userModel.avatar, item.postdate, item.postdate)
        })
        const sortCommentList = commentList.sort((a, b) => {
            const prev = new Date(a.date)
            const next = new Date(b.date)
            return prev - next
        })
        const newCommentList = [...sortCommentList.reverse()].map((item) => {
            return {
                ...item,
                "date": new Date(item.date).toLocaleDateString("vi-VN")
            }
        })
        return {
            data: newCommentList
        }
    } else if(response.request.responseURL.includes("http://localhost:8080/notification/getByUserId/")) {
        const notifyList = response.data.sort((a, b) => {
            const prev = new Date(a.sentdate)
            const next = new Date(b.sentdate)
            return prev - next
        })
        return {
            data: notifyList
        }
    }
    
    
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axiosClient