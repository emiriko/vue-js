

<script lang="ts">

import { defineComponent, ref } from 'vue';
import FilmForm from '@/components/layout/FilmForm.vue';
import ShowForm from '@/components/layout/ShowForm.vue';
import BookForm from '@/components/layout/BookForm.vue';

import 'vue-toast-notification/dist/theme-bootstrap.css';

export default defineComponent({
  name: 'Update Series',
  components: {
    FilmForm,
    ShowForm,
    BookForm,
  },  
  data() {
    return {
      component: "FilmForm",
      method: "UPDATE",
      id: this.$route.params.id
    };
  },
  created() {
    const params = this.$route.params.type;
    // console.log(this.$route.params);
    // this.address = params.pop();
    if (params === "film") {
        this.component = "FilmForm"
      } else if (params === "show") {
        this.component = "ShowForm"
      } else {
        this.component = "BookForm"
      }
  },
  
  
})

</script>

    


<template>
    <component :is="component" :method="method" :id="id">
        <div></div>
        <h1 class = "capitalize text-5xl font-bold text-white w-full"> Update {{ $route.params.type }} {{ id }} </h1>

    </component>
    
    
</template>
