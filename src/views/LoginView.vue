<script lang="ts">
import { defineComponent } from 'vue';
import Auth from '@/components/layout/Auth.vue';
import { LockClosedIcon, UserIcon } from '@heroicons/vue/24/solid';

export default defineComponent({
  name: 'Login',
  components: {
    Auth,
    UserIcon,
    LockClosedIcon
},
})

</script>

<template>
  <Auth>
    <div class = "flex py-20 mx-0 justify-center">
        <form class = "flex flex-col max-w-3xl w-full mx-0 gap-y-8" action="/">
            <div class="flex items-center gap-x-4 w-full mx-0 relative">
                <input type="text" class = "px-6 py-4 bg-[#3F4152] rounded-lg placeholder:text-[#9C9C9C] text-light-grey w-full" placeholder="Username" />
                <UserIcon class="w-5 h-5 absolute right-0 ml-4 pointer-events-none" />
            </div>
            <div class="flex items-center gap-x-4 w-full mx-0 relative">
                <input type="password" class = "px-6 py-4 bg-[#3F4152] rounded-lg placeholder:text-[#9C9C9C] text-light-grey w-full" placeholder="Password"/>
                <LockClosedIcon class="w-5 h-5 absolute right-0 ml-4 pointer-events-none" />
            </div>
            
        </form>
    </div>
  </Auth>
</template>
