import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import axios from 'axios'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const baseAuthUrl = "http://34.124.246.185/api/auth"

// Check Apakah Role Admin untuk bisa akses path Create & Update
router.beforeEach(async (to, from, next) => {

    if (to.meta.requiresRoleCheck) {
        var token;
        const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Check if the cookie starts with the specified name
                if (cookie.startsWith("token" + '=')) {
                // Return the value of the cookie
                token = cookie.substring("token".length + 1);
                }
            }
        try{
            
            const response = await axios.get(`${baseAuthUrl}/verify`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.user.role !== "ADMIN") {
                next({path: '/'});
                return;
            }
        } catch (err) {
            console.error(err)
            next({path: '/'});
        }
        
    }
    next()
})
