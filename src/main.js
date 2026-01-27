import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import BaseButton from './components/base/BaseButton.vue'
import BaseInput from './components/base/BaseInput.vue'
import BaseSelect from './components/base/BaseSelect.vue'
import BaseTable from './components/base/BaseTable.vue'
import BaseModal from './components/base/BaseModal.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('BaseButton', BaseButton);
app.component('BaseInput', BaseInput);
app.component('BaseSelect', BaseSelect);
app.component('BaseTable', BaseTable);
app.component('BaseModal', BaseModal);

app.mount('#app')
