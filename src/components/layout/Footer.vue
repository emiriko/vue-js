<script lang="ts"> 
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import GitlabIcon from '../icons/GitlabIcon.vue';

interface Menu {
  name: string;
  url: string
}

export default defineComponent({
  name: 'Footer',
  components: {
    RouterLink,
    GitlabIcon
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
});

</script>

<template>
    <footer class = "flex lg:flex-row flex-col items-center relative bottom-0 min-h-[120px] w-full border-t border-t-[#4D4D4D] py-20 font-bold gap-x-24 gap-y-8">
        <div class = "flex flex-col text-center gap-y-8">
          <router-link to = "/" class = "font-bold text-white text-4xl m-0"> Tracko </router-link> 
          <p className = "flex flex-col gap-y-8">
            <p class = "text-[#F4F4F4] text-sm"> Adpro B11 - 2023 </p>
            <a href = "https://gitlab.cs.ui.ac.id/AdvProg/reguler-2023/mahasiswa/kelas-b/2106752180-Alvaro-Austin-/b11" class = "text-center flex justify-center">
              <GitlabIcon class = "w-fit h-fit text-center flex justify-center" />
            </a>
          </p>
        </div>
        <ul class = "flex flex-col justify-evenly gap-y-8 lg:text-left text-center">
            <li v-for="({name, url}, key) in menus" :key="key" class = "m-0 p-0">
                <router-link :to = "url" class = "font-bold text-sm m-0 hover:text-light-white duration-300" :class="$route.name === name.toLowerCase() ? 'text-light-white' : 'text-light-grey' ">
                    {{name}}
                </router-link>
            </li>
        </ul> 
    </footer>
</template>
