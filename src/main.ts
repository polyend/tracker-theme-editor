import { createApp } from 'vue';
import App from './App.vue';
import { initStore } from './stores/themeStore';
import './styles/main.scss';

const app = createApp(App);
app.mount('#app');

initStore();
