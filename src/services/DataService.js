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
    async postReg(login, password) {
        let res = await axios.post(`${Global.API}/reg`, {
            login: login,
            password: password
        });
        return res.data;
    },
    async postAuth(login, password) {
        let res = await axios.post(`${Global.API}/auth`, {
            login: login,
            password: password
        });
        return res.data;
    },
    async checkToken() {
        let res = await axios.post(`${Global.API}/checkToken`, {
            login: sessionStorage.getItem('login'),
            token: sessionStorage.getItem('token')
        });
        return res.data;
    },
    async postUserVote(votes, previousVote, name) {
        let res = await axios.post(`${Global.API}/userVote`, {
            login: sessionStorage.getItem('login'),
            token: sessionStorage.getItem('token'),
            name: name,
            votes: votes,
            previousVote: previousVote
        });
        return res.data;
    },
    async postCheckVote() {
        let res = await axios.post(`${Global.API}/checkUserVote`, {
            login: sessionStorage.getItem('login'),
            token: sessionStorage.getItem('token')
        });
        return res.data;
    }
}