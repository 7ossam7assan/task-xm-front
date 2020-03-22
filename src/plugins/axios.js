import Vue from "vue";
import axios from "axios";
import { Service } from "axios-middleware";

const apiBaseUrl = "https://api.eattheyolk.com/api/admin";
// const apiBaseUrl = "http://ety.test/api/admin";
const apiImageUrl = "https://api.eattheyolk.com/api";
// const apiImageUrl = "http://ety.test/api";

// Add a response interceptor
const service = new Service(axios);

service.register({
    onResponseError(error) {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
    }
});

Vue.prototype.$http = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
});

Vue.prototype.$image_http = axios.create({
    baseURL: apiImageUrl,
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
});

Vue.prototype.$http_noauth = axios.create({
    baseURL: apiBaseUrl,
    headers: {}
});
