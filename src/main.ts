import { createApp, provide, reactive   } from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVueNext from "bootstrap-vue-next";
import VueApexCharts from "vue3-apexcharts";
import { QuillEditor } from '@vueup/vue-quill'
import Vue3Prism from 'vue3-prism/lib/Vue3Prism.common.js'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "swiper/css";
import "swiper/css/bundle";
import 'flatpickr/dist/flatpickr.css';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import "vue3-prism/lib/Vue3Prism.css"
import "./assets/custom.scss";
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store'


const app = createApp(App).use(router);
app.use(VueApexCharts, Vuex);
app.use(BootstrapVueNext);
app.component('QuillEditor', QuillEditor)
app.use(store)
app.use(VueAxios, axios)
app.use(Vue3Prism)
// app.mixin(mixins)


const globalState = reactive({
    formData: {
      amount: '',
      tenor: '',
      // Add more fields as needed
    },

  });
  
  const updateFormData = (formData) => {
    globalState.formData = { ...globalState.formData, ...formData };
  };
  
  const options = {
    // You can set your default options here
};

app.use(Toast, options);
  
app.provide('globalState', globalState);
app.provide('updateFormData', updateFormData);

app.mount("#app");
