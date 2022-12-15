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
    },
    async getCharter() {
        let res = await axios.get(`${Global.API}/charter`);
        return res.data;
    },
    async getNews() {
        let res = await axios.get(`${Global.API}/news`);
        return res.data;
    },
    async getVotes() {
        let res = await axios.get(`${Global.API}/votes`);
        return res.data;
    },
    async putVotes(votes, previousVote) {
        let res = await axios.put(`${Global.API}/vote`, {
            countVotes: Number(votes),
            previousVote: previousVote
        });
        return res.data;
    }
}