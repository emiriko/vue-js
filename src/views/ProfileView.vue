<script lang="ts">
import Button from '@/components/common/Button.vue';
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { EnvelopeIcon, IdentificationIcon, UserIcon } from '@heroicons/vue/24/solid';
import InputField from '@/components/common/InputField.vue';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import Cookies from 'js-cookie';

export default defineComponent({
  name: 'Login',
  components: {
    "v-button": Button,
    UserCircleIcon,
    UserIcon,
    EnvelopeIcon,
    IdentificationIcon,
    InputField,
  },
  methods: {
    openModal() {
        this.showModal = true;
    },
    closeModal() {
        this.showModal = false;
    },
    edit(e: Event) {
      e.preventDefault()
      
      const payload = {
        name: this.changeName,
        email: this.changeEmail,
        username: this.changeUsername,
      }

      axios.put("http://34.124.246.185/api/profile", payload, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((res) => {
        this.showSuccessToast(res.data.message)
        this.showModal = false
       
        if(this.changeEmail !== this.email || this.changeUsername !== this.username) {
          Cookies.remove('token')
          this.$router.push('/auth/sign-in');
        } else {
          this.email = this.changeEmail
          this.name = this.changeName
          this.username = this.changeUsername
        }
      })
      .catch((error) => {
        console.log(error)
        this.showErrorToast(error.response.data.message);
      })
    }
  },
  data() {
    return {
      showModal: false
    };
  },
  setup() {
    const name = ref("")
    const email = ref("")
    const username = ref("")
    const changeName = ref("")
    const changeEmail = ref("")
    const changeUsername = ref("")
    const toast = useToast();
    const showComponent = ref(false)
    const role = ref("")
    const token = Cookies.get('token');
    
    const showSuccessToast = (message: string) => {
      toast.success(message);
    };

    const showErrorToast = (message: string) => {
      toast.error(message);
    };

    onMounted(() => {
      axios.get("http://34.124.246.185/api/auth/verify", {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        name.value = res.data.user.name;
        email.value = res.data.user.email;
        username.value = res.data.user.username;
        changeName.value = res.data.user.name;
        changeEmail.value = res.data.user.email;
        changeUsername.value = res.data.user.username;
        role.value = res.data.user.role;
        showComponent.value = true
      })
      .catch((err) => {
        console.log(err)
      })
    });

    return {
        name,
        role,
        email,
        username,
        token,
        changeName,
        changeEmail,
        changeUsername,
        showSuccessToast,
        showErrorToast,
        showComponent
    }
  },
})
</script>

<template>
    <div v-show=showComponent class = "flex flex-col m-0 p-0 w-full gap-y-12">
        <h1 class = "capitalize text-5xl font-bold text-white w-full"> {{ $route.name }}</h1>

        <div class = "flex lg:flex-row flex-col border-2 border-black profile rounded-3xl gap-8 py-12 px-6 mx-0">
            <div class = "lg:w-2/5 flex flex-col justify-center w-full items-center mx-0">
                <UserCircleIcon class = "w-full border-none max-w-xs"/>
            </div>
            <div class = "flex flex-col lg:w-3/5  justify-center gap-y-8 py-4 max-lg:items-center">
                <h1 class = "text-white lg:text-5xl md:text-3xl text-xl font-bold lg:text-left text-center"> Hello, {{ name }} </h1>
                <div class = "mx-0 flex flex-col gap-y-6 lg:text-base md:text-sm text-xs">
                    <div class = "flex mx-0 gap-x-[52px] sm:flex-row flex-col max-sm:items-center">
                        <h2 class = "capitalize"> Email </h2>
                        <p class = "font-bold text-violet"> {{ email }}</p>
                    </div>
                    <div class = "flex mx-0 gap-x-12 sm:flex-row flex-col max-sm:items-center">
                        <h2 class = "capitalize"> Name </h2>
                        <p class = "font-bold text-violet"> {{ name }}</p>
                    </div>
                    <div class = "flex mx-0 gap-x-12 sm:flex-row flex-col max-sm:items-center">
                        <h2 class = "capitalize"> Username </h2>
                        <p class = "font-bold text-violet"> {{ username }}</p>
                    </div>
                    <div class = "flex mx-0 gap-x-12 sm:flex-row flex-col max-sm:items-center">
                        <h2 class = "capitalize"> Role </h2>
                        <p class = "font-bold text-violet capitalize"> {{ role }}</p>
                    </div>
                </div>
                <button className = "max-w-full px-8 py-2 text-center rounded-xl font-bold bg-indigo text-white" @click="openModal"> Edit Profile </button>
            </div>
        </div>
        <div v-show="showModal" class="fixed z-10 inset-0 overflow-y-auto bg-opacity-60">
            <div class="flex items-center justify-center min-h-screen">
                <div class="w-1/2 px-6 py-4 bg-grey rounded- flex flex-col gap-y-8 text-white font-bold">
                <h2 class="text-xl mb-4">Edit Profile</h2>
                <p className = "text-red-500"> Warning: Changing your username/email will automatically log you out</p>
                <form class = "flex flex-col max-w-5xl w-full mx-0 gap-y-8 items-center" action = "/" :onSubmit="edit">

                    <InputField type="text" placeholder="Name" v-on:update:inp="changeName=$event" v-bind:inp="changeName"> 
                        <IdentificationIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
                    </InputField>
                    <InputField type="text" placeholder="Username" v-on:update:inp="changeUsername = $event" v-bind:inp="changeUsername"> 
                        <UserIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
                    </InputField>
                    <InputField type="email" placeholder="Email" v-on:update:inp="changeEmail = $event" v-bind:inp="changeEmail"> 
                        <EnvelopeIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
                    </InputField>
                    <v-button type="indigo" className = "text-center flex justify-center w-fit"> Edit </v-button>
                </form>
                <div class="mt-4">
                    <button @click="closeModal" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Close Modal
                </button>
                </div>
                </div>
            </div>
        </div>
     </div>
</template>
