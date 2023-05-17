<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
    data() {
        return {
            search: ""
        }
    },
})
</script>

<template>
    <input type="text" v-model="search" placeholder="search series"/>
</template>