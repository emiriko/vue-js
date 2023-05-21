

<script lang="ts">

import { defineComponent, ref } from 'vue';
import FilmForm from '@/components/layout/FilmForm.vue';
import ShowForm from '@/components/layout/ShowForm.vue';
import BookForm from '@/components/layout/BookForm.vue';

import 'vue-toast-notification/dist/theme-bootstrap.css';

export default defineComponent({
  name: 'Create Series',
  components: {
    FilmForm,
    ShowForm,
    BookForm,
  },  
  data() {
    return {
      component: "FilmForm",
      method: "POST"
    };
  },
  
  
})

</script>

    


<template>
    <button class="px-8 py-2 text-center rounded-xl font-bold hover:text-purple-700" @click="component ='FilmForm'">Film</button>
    <button class="px-8 py-2 text-center rounded-xl font-bold hover:text-purple-700" @click="component ='ShowForm'">Show</button>
    <button class="px-8 py-2 text-center rounded-xl font-bold hover:text-purple-700" @click="component ='BookForm'">Book</button>
    <component :is="component" :method="method">
        <h1 class = "capitalize text-5xl font-bold text-white w-full"> Create Series </h1>

    </component>
    
    
</template>
