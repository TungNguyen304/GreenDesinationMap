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
    function create(id,mapid,userid,name,road,ward,district,city,phone,address,type,lat,lon,star,host,description,startday,status,browserday, useravt, criteriaList, imagesCollection){
        return {id,mapid, userid, name, road, ward, district, city, phone, address, type, lat, lon, star, host, description, startday, status, browserday, useravt, criteriaList, imagesCollection}
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
    response.request.responseURL === 'http://localhost:8080/place/information') {
        if(response.data) {
            const data = response.data.map((e) => {
                const startday = new Date(e.startday).toLocaleDateString("vi-VN")
                const browserday = e.browserday ? new Date(e.browserday).toLocaleDateString("vi-VN") : null
                const newImageList = e.imagesCollection.map((item) => ({
                    "id": item.imageid,
                    "name": item.imagename,
                    "key": item.imagekey
                }))
                const address = (e.road ? e.road + ", " : "") + (e.ward ? e.ward + ", " : "") + (e.district ? e.district : "");
                return create(e.placeid, e.mapid, e.userid.userid, e.placename, e.road, e.wrad, e.district, e.city, e.phone, address, 
                e.placetypeid.type, e.lat, e.lon, e.star, e.userid.username, e.description, startday, e.status, browserday, e.userid.avatar, e.ratingsCollection, newImageList)
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
        return {
            data: create(e.placeid, e.mapid, e.userid.userid, e.placename, e.road, e.wrad, e.district, e.city, e.phone, e.road + ", " + e.ward + ", " + e.district, 
            e.placetypeid.type, e.lat, e.lon, e.star, e.userid.username, e.description, startday, e.status, browserday, e.userid.avatar, e.ratingsCollection, e.imagesCollection)
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
    }
    
    
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axiosClient