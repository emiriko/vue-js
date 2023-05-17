<script lang="ts">
import { defineComponent, ref } from 'vue';
import SearchBar from "@/components/common/SearchBar.vue";
import axios from 'axios';

export default defineComponent ({
    name: "Test",
    components: {
        SearchBar
    },
    methods: {
        searchSeries(keyword: string) {
            axios.get('http://localhost:8080/api/catalog/search?keyword=${keyword}')
        }
    },
    setup() {
        const keyword = ref("");
    }
})

</script>


<template>
    <SearchBar></SearchBar>
</template>