<script lang="ts">
import { defineComponent } from 'vue';
import Auth from '@/components/layout/Auth.vue';
import Button from '@/components/common/Button.vue';
import { LockClosedIcon, UserIcon } from '@heroicons/vue/24/solid';
import InputField from '@/components/common/InputField.vue';

export default defineComponent({
  name: 'Login',
  components: {
    Auth,
    UserIcon,
    LockClosedIcon,
    "v-button": Button,
    InputField
},
})

</script>

<template>
  <Auth url = "/auth/sign-up" text = "Create an Account">
    <div class = "flex py-14 mx-0 justify-center">
        <form class = "flex flex-col max-w-5xl w-full mx-0 gap-y-8 items-center" action="/">
            <InputField type="text" placeholder="Username"> 
              <UserIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
            </InputField>
            <InputField type="password" placeholder="Password"> 
              <LockClosedIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
            </InputField>
            <v-button type="indigo" className = "text-center  w-fit"> Sign in </v-button>
        </form>
    </div>
  </Auth>
</template>
