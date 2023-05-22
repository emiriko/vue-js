<script lang="ts">
import { defineComponent} from 'vue';
import axios from 'axios';

export default defineComponent ({
    name: "Catalog",
    components: {},

    data() {
        return {
            searchText: "",
            data: []
        };
    },

    async mounted() {
    await axios
        .get('http://localhost:8080/api/catalog/')
        .then(response => (this.data = response.data))

    },

    methods: {
        async searchSeries() {
            this.$router.replace({path: "/catalog/search",query: {keyword: this.searchText.toLowerCase()}});
            
            await axios.get("http://localhost:8080/api/catalog/search", {params: {keyword: this.searchText}})
            .then((response) => {
                this.data = response.data
                console.log(this.data)
            });
        },
    },
})
</script>


<template>
    
    <div>
        <input type="text" placeholder="Search by Genres, Title, Creator, and id" v-model="searchText" class="px-6 py-4 bg-[#3F4152] rounded-lg placeholder:text-[#9C9C9C] text-light-grey w-full"/>
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