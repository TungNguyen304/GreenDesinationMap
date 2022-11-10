import { data } from "autoprefixer";
import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        //  Authorization: `<Your Auth Token>`,
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Methods": "*",
            // "Access-Control-Allow-Credentials": "true",
            // "Access-Control-Allow-Headers": "*"
    },
})
// axiosClient.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

axiosClient.interceptors.response.use(function (response) {
    function create(id,mapid,userid,name,road,ward,district,city,phone,address,type,lat,lon,star,host,description,startday,status,browserday){
        return {id,mapid, userid, name, road, ward, district, city, phone, address, type, lat, lon, star, host, description, startday, status, browserday}
    }

    if(response.request.responseURL === 'http://localhost:8080/user/userInfor') {
        const data = {
            ...response.data,
            image: response.data.avatar,
            gender: response.data.gender ? 'Nam' : 'Nữ',
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
    else if((response.request.responseURL === `http://localhost:8080/place/findByUserId/${response.data[0].userid.userid}`) || 
    response.request.responseURL === 'http://localhost:8080/place/information') {
        const data = response.data.map((e) => {
            const startday = new Date(e.startday).toLocaleDateString("vi-VN")
            const browserday = new Date(e.browserday).toLocaleDateString("vi-VN")
            return create(e.placeid, e.mapid, e.userid.userid, e.placename, e.road, e.wrad, e.district, e.city, e.phone, e.road + ", " + e.ward + ", " + e.district, 
            e.placetypeid.placetypeid, e.lat, e.lon, e.star, e.userid.username, e.description, startday, e.status, browserday)
        })
        return {
            data: data
        }
    }
    else if(response.request.responseURL === `http://localhost:8080/place/${response.data.placeid}`) {
        const e = response.data
        const startday = new Date(e.startday).toLocaleDateString("vi-VN")
        const browserday = new Date(e.browserday).toLocaleDateString("vi-VN")
        return {
            data: create(e.placeid, e.mapid, e.userid.userid, e.placename, e.road, e.wrad, e.district, e.city, e.phone, e.road + ", " + e.ward + ", " + e.district, 
            e.placetypeid.placetypeid, e.lat, e.lon, e.star, e.userid.username, e.description, startday, e.status, browserday)
        }
    }
    

    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axiosClient