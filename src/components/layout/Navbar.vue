<script lang="ts"> 
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

interface Menu {
  name: string;
  url: string
}

export default defineComponent({
  name: 'Navbar',
  components: {
    RouterLink,
  },
  data() {
    return {
        menus: [
            {
                name: "Home",
                url: "/"
            },
            {
                name: "Catalog",
                url: "/catalog"
            },
            {
                name: "My Progress",
                url: "/progress"
            },
            {
                name: "Profile",
                url: "/profile"
            },
        ] as Menu[]
    };
  },
});

</script>

<template>
    <nav class = "flex items-center justify-between h-24 relative border-b border-[#4D4D4D]">
        <router-link to = "/" class = "font-bold text-white text-2xl m-0"> Tracko </router-link> 
        <ul class = "flex items-center gap-x-10">
            <li v-for="({name, url}, key) in menus" :key="key" class = "m-0 p-0">
                <router-link :to = "url" class = "font-bold text-sm m-0">
                    {{name}}
                </router-link>
            </li>
        </ul>
    </nav>
</template>
