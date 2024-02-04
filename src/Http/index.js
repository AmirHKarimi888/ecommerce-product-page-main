import axios from "axios";

//"https://65bead90dcfcce42a6f2d1a5.mockapi.io/amir888"
//"http://localhost:3000"

class Http {

    url = "https://65bead90dcfcce42a6f2d1a5.mockapi.io/amir888";

    async get(url) {
        try {
            return await axios.get(url);
        } catch(err) {
            console.log(err.message);
        }
    }

    async post(url, data) {
        try {
            return await axios.post(url, data);
        } catch(err) {
            console.log(err.message);
        }
    }

    async put(url, data) {
        try {
            return await axios.put(url, data);
        } catch(err) {
            console.log(err.message);
        }
    }

    async delete(url) {
        try {
            return await axios.delete(url);
        } catch(err) {
            console.log(err.message);
        }
    }
}

export default new Http();