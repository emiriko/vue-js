<script lang="ts">
import { defineComponent} from 'vue';
import Button from '@/components/common/Button.vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';

export default defineComponent ({
    name: "Catalog",
    components: {},
    data() {
        return {
            searchText: "",
            data: [],
        }
    },
    mounted () {
    axios
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
        
        <router-link to="/catalog/create" tag="button">CREATE</router-link>
        <router-link to="/catalog/update/show/1" tag="button">UPDATE</router-link>
        


    </div>
    <div>
        <input type="text" v-model="searchText" class="px-6 py-4 bg-[#3F4152] rounded-lg placeholder:text-[#9C9C9C] text-light-grey w-full"/>
        <button id="search-button" @click="searchSeries">Search</button>
    </div>


    <div>
        <p>
            {{ $data }}
        </p>
    </div>
</template>

<style>
div {
    justify-content: center;
    text-align: center;
}

div #search-button {
    margin-top: 20px;
}

</style>