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

const baseAuthUrl = "http://localhost:8080/api/auth"

// Check Apakah Role Admin untuk bisa akses path Create & Update
router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresRoleCheck) {
        try{
            const response = await axios.get(`${baseAuthUrl}/verify`)
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
