<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router'
import Navbar from './components/layout/Navbar.vue';
import "./assets/main.css"

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    RouterView // register RouterView component
  },
});
</script>

<template>
  <Navbar />
  <RouterView />
</template>
