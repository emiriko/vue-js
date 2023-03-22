<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router'
import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue';
import "./assets/main.css"

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    RouterView, // register RouterView component
    Footer
  },
});
</script>

<template>
  <main class = "relative min-h-screen">
    <Navbar />
    <RouterView />
    <Footer />
  </main>
</template>
