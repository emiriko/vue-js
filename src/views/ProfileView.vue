<script lang="ts">
import Button from '@/components/common/Button.vue';
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { EnvelopeIcon, IdentificationIcon, UserIcon } from '@heroicons/vue/24/solid';
import InputField from '@/components/common/InputField.vue';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

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
        this.name = '';
    },
    edit(e: Event) {

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
    const toast = useToast();

    const showSuccessToast = (message: string) => {
      toast.success(message);
    };

    onMounted(() => {
      
    });

    return {
        name,
        email,
        username,
        showSuccessToast,
    }
  }
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
                <button className = "max-w-full px-8 py-2 text-center rounded-xl font-bold bg-indigo text-white" @click="openModal"> Edit Profile </button>
            </div>
        </div>
        <div v-show="showModal" class="fixed z-10 inset-0 overflow-y-auto bg-opacity-60">
            <div class="flex items-center justify-center min-h-screen">
                <div class="w-1/2 px-6 py-4 bg-grey rounded- flex flex-col gap-y-8 text-white font-bold">
                <h2 class="text-xl mb-4">Edit Profile</h2>
                <form class = "flex flex-col max-w-5xl w-full mx-0 gap-y-8 items-center" action = "/" :onSubmit="edit">

                    <InputField type="text" placeholder="Name" v-on:update:inp="name = $event" v-bind:inp="name"> 
                        <IdentificationIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
                    </InputField>
                    <InputField type="text" placeholder="Username" v-on:update:inp="username = $event" v-bind:inp="username"> 
                        <UserIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
                    </InputField>
                    <InputField type="email" placeholder="Email" v-on:update:inp="email = $event" v-bind:inp="email"> 
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
