import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import App from "./App.vue";
import router from "./router";

import BaseButton from "./components/base/BaseButton.vue";
import BaseInput from "./components/base/BaseInput.vue";
import BaseSelect from "./components/base/BaseSelect.vue";
import BaseTable from "./components/base/BaseTable.vue";
import BaseModal from "./components/base/BaseModal.vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import BaseTableUserPage from "./components/base/BaseTableUserPage.vue";

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);

app.use(router);

// global components
app.component("BaseButton", BaseButton);
app.component("BaseInput", BaseInput);
app.component("BaseSelect", BaseSelect);
app.component("BaseTable", BaseTable);
app.component("BaseTableUserPage", BaseTableUserPage);
app.component("BaseModal", BaseModal);

// register globally
app.component("Swiper", Swiper);
app.component("SwiperSlide", SwiperSlide);

app.mount("#app");
