<script lang="ts"> 
import { defineComponent, onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { Bars3Icon } from '@heroicons/vue/24/solid'
import { useMenu } from '@/stores';
import axios from 'axios';
import Cookies from 'js-cookie';

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
  setup: () => {
    const menu = useMenu();
    const showLogin = ref(true);
    const menus = ref<Menu[]>([]);
    const token = ref(Cookies.get('token'));

    const fetchMenus = () => {
      if (token.value) {
        axios
          .get('http://34.124.246.185/api/auth/verify', {
            headers: {
              Authorization: `Bearer ${token.value}`
            }
          })
          .then((_) => {
            showLogin.value = false;
            menus.value = [
              {
                name: 'Home',
                url: '/'
              },
              {
                name: 'Catalog',
                url: '/catalog'
              },
              {
                name: 'My Progress',
                url: '/progress'
              },
              {
                name: 'Profile',
                url: '/profile'
              }
            ];
          })
          .catch((_) => {
            showLogin.value = true;
            menus.value = [
              {
                name: 'Home',
                url: '/'
              },
              {
                name: 'Catalog',
                url: '/catalog'
              },
              {
                name: 'My Progress',
                url: '/progress'
              },
              {
                name: 'Sign In',
                url: '/auth/sign-in'
              }
            ];
          });
      } else {
        showLogin.value = true;
        menus.value = [
          {
            name: 'Home',
            url: '/'
          },
          {
            name: 'Catalog',
            url: '/catalog'
          },
          {
            name: 'My Progress',
            url: '/progress'
          },
          {
            name: 'Sign In',
            url: '/auth/sign-in'
          }
        ];
      }
    };

    // Watch for changes in the token value
    watch(token, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        // Fetch menus whenever the token changes
        fetchMenus();
      }
    });

    // Fetch menus when the component is mounted
    onMounted(() => {
      fetchMenus();
    });

    return {
      menu,
      token,
      showLogin,
      menus
    };
  },
  methods: {
    handleLogout() {
      Cookies.remove("token")
      window.location.replace(window.location.origin + "/")
    }
  }
});

</script>

<template>
    <nav class = "flex items-center justify-between h-24 relative border-b border-[#4D4D4D] w-full">
        <router-link to = "/" class = "font-bold text-white text-2xl m-0"> Tracko </router-link> 
        <ul class = "lg:flex items-center gap-x-10 hidden" :class="menu._isOpen ? '!flex flex-col lg:flex-row max-lg:absolute right-0 top-28 max-lg:items-end z-10' : 'hidden'">
            <li v-for="({name, url}, key) in menus" :key="key" class = "m-0 p-0">
                <router-link :to = "url" class = "font-bold text-sm m-0 hover:text-light-white duration-300" :class="[$route.name === name.toLowerCase() ? 'text-light-white' : 'text-light-grey']">
                    {{name}}
                </router-link>
            </li>
            <p className = "cursor-pointer text-red-500 font-bold text-sm" v-show="!!token" @click="handleLogout"> Logout </p>
        </ul>
        <Bars3Icon class="h-6 w-6 text-white lg:hidden flex cursor-pointer m-0" @click="menu.toggleHamburger()"/>
    </nav>
</template>
