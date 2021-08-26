import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI';
import router from '@/router/router';

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component) 
}) // globalnaja registracija UI komponentov

app
    .use(router)
    .mount('#app');
