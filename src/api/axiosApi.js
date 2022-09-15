import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        //  Authorization: `<Your Auth Token>`,
            "Content-Type": "application/json"
    }
})

export default axiosClient