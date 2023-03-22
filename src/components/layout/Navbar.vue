<script lang="ts"> 
import { defineComponent, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { Bars3Icon } from '@heroicons/vue/24/solid'
import { useMenu } from '@/stores';

interface Menu {
  name: string;
  url: string
}

export default defineComponent({
  name: 'Navbar',
  components: {
    RouterLink,
    Bars3Icon
  },
  data: () => ({
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
  }),
  methods: {
    handleOpenHamburger(){
        
    }
  },
  setup: () => {
    const menu = useMenu()
    return {
      menu
    }
  }
});

</script>

<template>
    <nav class = "flex items-center justify-between h-24 relative border-b border-[#4D4D4D] w-full">
        <router-link to = "/" class = "font-bold text-white text-2xl m-0"> Tracko </router-link> 
        <ul class = "lg:flex items-center gap-x-10 hidden" :class="menu._isOpen ? '!flex flex-col lg:flex-row max-lg:absolute right-0 top-28 max-lg:items-end' : 'hidden'">
            <li v-for="({name, url}, key) in menus" :key="key" class = "m-0 p-0">
                <router-link :to = "url" class = "font-bold text-sm m-0 hover:text-light-white duration-300" :class="$route.name === name.toLowerCase() ? 'text-light-white' : 'text-light-grey' ">
                    {{name}}
                </router-link>
            </li>
        </ul>
        <Bars3Icon class="h-6 w-6 text-white lg:hidden flex cursor-pointer m-0" type = "button" @click="menu.toggleHamburger()"/> 
    </nav>
</template>
