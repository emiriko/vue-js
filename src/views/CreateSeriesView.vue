

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
  methods: {
    selected(buttonId:   string) {

        const buttons = document.getElementsByClassName("formButton");
        for(var button of buttons){
          if (button.id === buttonId){
            button.classList.add("text-purple-900")
          } else {
            button.classList.remove("text-purple-900")
          }
           
         }
        this.component = buttonId;
      
    }
  }
  
  
})

</script>

    


<template>
    <button id="FilmForm" class="text-purple-900 px-8 py-2 text-center rounded-xl font-bold hover:text-purple-700 formButton" @click="selected('FilmForm')">Film</button>
    <button id="ShowForm" class="px-8 py-2 text-center rounded-xl font-bold hover:text-purple-700 formButton" @click="selected('ShowForm')">Show</button>
    <button id="BookForm" class="px-8 py-2 text-center rounded-xl font-bold hover:text-purple-700 formButton" @click="selected('BookForm')">Book</button>
    <component :is="component" :method="method">
        <h1 class = "capitalize text-5xl font-bold text-white w-full"> Create Series </h1>

    </component>
    
    
</template>
