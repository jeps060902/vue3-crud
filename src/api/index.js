import axios from "axios";
const Api = axios.create({
    baseURL:'http://pengelolaan_alumni_api.test'
}
)
export default Api