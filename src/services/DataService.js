import axios from 'axios'
import Global from "../../global";

export default {
    async getData() {
        let res = await axios.get(`${Global.API}/about/datatable`);
        return res.data;
    },

    async getDataById(id) {
        let res = await axios.get(`${Global.API}/about/datatable/${id}`);
        return res.data;
    },
    async getPersons() {
        let res = await axios.get(`${Global.API}/persons`);
        return res.data;
    }
}