<script lang="ts">
import Button from '@/components/common/Button.vue';
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',
  components: {
    "v-button": Button,
    UserCircleIcon
},
})
</script>

<template>
    <div class = "flex flex-col m-0 p-0 w-full gap-y-12">
        <h1 class = "capitalize text-5xl font-bold text-white w-full"> {{ $route.name }}</h1>

        <div class = "flex lg:flex-row flex-col border-2 border-black profile rounded-3xl gap-8 py-12 px-6 mx-0">
            <div class = "lg:w-2/5 flex flex-col justify-center w-full items-center mx-0">
                <UserCircleIcon class = "w-full border-none max-w-xs"/>
            </div>
            <div class = "flex flex-col lg:w-3/5  justify-center gap-y-8 py-4 max-lg:items-center">
                <h1 class = "text-white lg:text-5xl md:text-3xl text-xl font-bold lg:text-left text-center"> Hello, username! </h1>
                <div class = "mx-0 flex flex-col gap-y-6 lg:text-base md:text-sm text-xs">
                    <div class = "flex mx-0 gap-x-[52px] sm:flex-row flex-col max-sm:items-center">
                        <h2 class = "capitalize"> Email </h2>
                        <p class = "font-bold text-violet"> example@gmail.com </p>
                    </div>
                    <div class = "flex mx-0 gap-x-12 sm:flex-row flex-col max-sm:items-center">
                        <h2 class = "capitalize"> Name </h2>
                        <p class = "font-bold text-violet"> John Doe</p>
                    </div>
                </div>
                <v-button type = "indigo" className = "max-w-full"> Edit Profile </v-button>
            </div>
        </div>
     </div>
</template>
