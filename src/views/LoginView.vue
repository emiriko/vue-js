<script lang="ts">
import { defineComponent, ref } from 'vue';
import Auth from '@/components/layout/Auth.vue';
import Button from '@/components/common/Button.vue';
import { LockClosedIcon, UserIcon } from '@heroicons/vue/24/solid';
import InputField from '@/components/common/InputField.vue';
import axios from 'axios';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import Cookies from 'js-cookie';

export default defineComponent({
  name: 'Login',
  components: {
    Auth,
    UserIcon,
    LockClosedIcon,
    "v-button": Button,
    InputField
  }, methods: {
    login(e: Event) {
      e.preventDefault()
      const payload = {
        username: this.username,
        password: this.password,
      }
      axios.post("http://34.124.246.185/api/auth/sign-in", payload)
      .then((res) => {
        Cookies.set('token', res.data.token, { expires: 7 });
        this.showSuccessToast(res.data.message)
        window.location.replace(window.location.origin + "/")
      })
      .catch((error) => {
        this.showErrorToast(error.response.data.message);
      })
    }
  },
  setup() {
    const username = ref('');
    const password = ref('');
    const toast = useToast();

    const showSuccessToast = (message: string) => {
      toast.success(message);
    };

    const showErrorToast = (message: string) => {
      toast.error(message);
    };

    return {
      username,
      password,
      showSuccessToast,
      showErrorToast
    };
  }
})

</script>

<template>
  <Auth url = "/auth/sign-up" text = "Create an Account">
    <div class = "flex py-14 mx-0 justify-center">
        <form class = "flex flex-col max-w-5xl w-full mx-0 gap-y-8 items-center" action = "/" :onSubmit="login">
            <InputField type="text" placeholder="Username" v-on:update:inp="username = $event" v-bind:inp="username"> 
              <UserIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
            </InputField>
            <InputField type="password" placeholder="Password" v-on:update:inp="password = $event" v-bind:inp="password"> 
              <LockClosedIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
            </InputField>
            <v-button type="indigo" className = "text-center flex justify-center w-fit"> Sign up </v-button>
        </form>
    </div>
  </Auth>
</template>
