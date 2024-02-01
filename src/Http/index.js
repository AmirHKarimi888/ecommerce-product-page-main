import axios from "axios";

class Http {

    url = "http://localhost:3000";

    async get(url) {
        try {
            return await axios.get(url);
        } catch(err) {
            console.log(err.message);
        }
    }
}

export default new Http();