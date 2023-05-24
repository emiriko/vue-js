<script lang="ts">
import { defineComponent} from 'vue';
import Button from '@/components/common/Button.vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';

interface Series {
  title: string;
  id: number;
  description: string;
  year: number;
  genres: string[];
  imageUrl: string;
  type: string;
}

interface User {
  role: string;
  username: string;
  name: string;
  email: string;
}

const baseCatalogUrl = "http://localhost:8080/api/catalog";

const baseAuthUrl = "http://34.124.246.185/api/auth";


export default defineComponent ({
    name: "Catalog",
    components: {},

    data() {
        return {
            searchText: "",
            data: [] as Series[],
            currentUser: {
                "role": "ADMIN"
            } as User,
            token: ""
        };
    },


    methods: {
        async searchSeries() {
            this.$router.replace({path: "/catalog/search",query: {keyword: this.searchText.toLowerCase()}});
            
            await axios.get(`${baseCatalogUrl}/search`, {params: {keyword: this.searchText}})
            .then((response) => {
                this.data = response.data
                console.log(this.data)
            });
        },
        getCookieValue(cookieName: String) {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Check if the cookie starts with the specified name
                if (cookie.startsWith(cookieName + '=')) {
                // Return the value of the cookie
                return cookie.substring(cookieName.length + 1);
                }
            }
            // Cookie not found
            return "";
        },
    },
    
    async mounted() {
        this.token = this.getCookieValue("token");
        console.log(this.token);

        await axios
            .get(`${baseCatalogUrl}/`)
            .then(response => (this.data = response.data))
        await axios
            .get(`${baseAuthUrl}/verify`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
            })
            .then(response => (this.currentUser = response.data.user))
    
    },
})
</script>


<template>
    <div class="text-right"></div>

    <div>
        <input type="text" placeholder="Search by Genres, Title, Creator, and id" v-model="searchText" class="px-6 py-4 bg-[#3F4152] rounded-lg placeholder:text-[#9C9C9C] text-light-grey w-full"/>
        <button v-if="currentUser['role'] === 'ADMIN'" id="search-button" @click="()=>$router.push('/catalog/create/')" class="px-8 py-2 text-center rounded-xl font-bold">Create</button>
        
        <button id="search-button" @click="searchSeries" class="px-8 py-2 text-center rounded-xl font-bold">Search</button>

    </div>

    <div class="series-list">
        <div class="series" v-for="series in data" :key="series['id']">
            <router-link :to="{name: 'detail', params: {id: series['id']}}" class="series-link">
                <div class="series-image">
                    <img v-bind:src="series['imageUrl']" alt="Series Image" class="image"/>
                    <div class="title">{{ series['title'] }}</div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<style>
div {
    justify-content: center;
    text-align: center;
}

div #search-button {
    margin-top: 15px;
    margin-bottom: 8px;
    background-color: indigo;
    color: white;
}

.series-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: auto;
}

.series {
    position: relative;
    width: 200px;
    height: 322px;
    margin: 10px;
}

.series-link {
    display: flex;
    flex-direction: column;
}

.series-image {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
}

.series-image .image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;

}

.title {
    display: flex;
    flex-direction: column;
    color: aliceblue;
}
</style>