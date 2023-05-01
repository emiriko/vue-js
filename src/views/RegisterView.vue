<script lang="ts">
import { defineComponent, ref } from 'vue';
import Auth from '@/components/layout/Auth.vue';
import Button from '@/components/common/Button.vue';
import { EnvelopeIcon, IdentificationIcon, LockClosedIcon, UserIcon } from '@heroicons/vue/24/solid';
import InputField from '@/components/common/InputField.vue';
import axios from 'axios';

export default defineComponent({
  name: 'Register',
  components: {
    Auth,
    LockClosedIcon,
    UserIcon,
    EnvelopeIcon,
    IdentificationIcon,
    "v-button": Button,
    InputField
  },
  methods: {
    register(e: Event) {
      e.preventDefault()
      const payload = {
        name: this.name,
        password: this.password,
        email: this.email,
        username: this.username,
        role: "ADMIN"
      }

      axios.post("http://localhost:8080/api/auth/sign-up", payload)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log("error", error)
      })
    }
  },
  setup() {
    const name = ref('');
    const username = ref('');
    const email = ref('');
    const password = ref('');

    return {
      name,
      username,
      email,
      password    
    };
  }
})

</script>

<template>
  <Auth url = "/auth/sign-in" text = "Log In">
    <div class = "flex py-14 mx-0 justify-center">
        <form class = "flex flex-col max-w-5xl w-full mx-0 gap-y-8 items-center" action = "/" :onSubmit="register">
            <InputField type="text" placeholder="Name" v-on:update:inp="name = $event" v-bind:inp="name"> 
              <IdentificationIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
            </InputField>
            <InputField type="text" placeholder="Username" v-on:update:inp="username = $event" v-bind:inp="username"> 
              <UserIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
            </InputField>
            <InputField type="email" placeholder="Email" v-on:update:inp="email = $event" v-bind:inp="email"> 
              <EnvelopeIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
            </InputField>
            <InputField type="password" placeholder="Password" v-on:update:inp="password = $event" v-bind:inp="password"> 
              <LockClosedIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
            </InputField>
            <v-button type="indigo" className = "text-center flex justify-center w-fit"> Sign up </v-button>
        </form>
    </div>
  </Auth>
</template>
