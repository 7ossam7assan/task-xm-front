import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";


Vue.config.productionTip = false;


import VeeValidate from 'vee-validate';


import en from 'vee-validate/dist/locale/en';
import en_attributes from './validation-attributes-translation/en_attributes.js'

Vue.use(
    VeeValidate, {
        locale: "en",
        dictionary: {
            en: {
                messages: en.messages,
                attributes: en_attributes
            }
        }
    }
)

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount("#app");
