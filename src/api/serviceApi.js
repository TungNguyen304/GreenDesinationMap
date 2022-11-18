import axiosClient from "./axiosApi";

const serviceApi = {
    getAll: (params) => {
        const url = '/place/information'
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
        console.log(data)
        console.log({ 
            "startday": "2015-09-07",
            "mapid": 1111111111,
            "status": false,
            "placename": "fdsaaaa",
            "lat": "12341234",
            "lon": "43214321",
            "country": "con",
            "city": "fdsa",
            "district": "fdsa",
            "ward": "cxzczxccxzczxc",
            "description": "trfdsue",
            "star": 3,
            "road": "real",
            "phone": "124314",
            "placetypeid": {
                "placetypeid": 1
            },
            "userid": {
                "userid": 14
            },
            "imagesCollection":[{
                "imagekey":  "5d9d74f4-1399-4b95-84c9-2869ec42f40f.webpf911db73-d084-4422-ad42-0419559b4b8f",
                "imagename": "https://firebasestorage.googleapis.com/v0/b/green-destination-map-c2c63.appspot.com/o/place%2Ff0a1c44a-9db9-436a-841a-aa550b3d9f6e.webp64c0aeb3-5576-4e6d-9a56-418af6ce57b8?alt=media&token=5ea751b7-ec67-4746-9504-767e4e9c90da"
              
            }, {
                "imagename": "https://firebasestorage.googleapis.com/v0/b/green-destination-map-c2c63.appspot.com/o/place%2Ff0a1c44a-9db9-436a-841a-aa550b3d9f6e.webp64c0aeb3-5576-4e6d-9a56-418af6ce57b8?alt=media&token=5ea751b7-ec67-4746-9504-767e4e9c90da",
                "imagekey":  "f0a1c44a-9db9-436a-841a-aa550b3d9f6e.webp64c0aeb3-5576-4e6d-9a56-418af6ce57b8"
            }],
            "ratingsCollection": [{
              "criteriavalue": true,
              "criteriasModel": {
                  "criteriaid": "1"
              },
              "useridfr": {
                  "userid": 14
              }
            }]
        });
        const url = '/place/addPlace'
        return axiosClient.post(url, data)
    },
    delete: (id) => {
        const url = `/place/deletePlace/${id}`
        return axiosClient.delete(url)
    }
}




export default serviceApi