

<script lang="ts">

import { defineComponent, ref } from 'vue';
import Auth from '@/components/layout/Auth.vue';
import Button from '@/components/common/Button.vue';
import { EnvelopeIcon, IdentificationIcon, LockClosedIcon, UserIcon } from '@heroicons/vue/24/solid';
import InputField from '@/components/common/InputField.vue';
import axios from 'axios';
import {Multiselect} from 'vue-multiselect';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

export default defineComponent({
  name: 'Film Form',
  components: {
    Auth,
    LockClosedIcon,
    UserIcon,
    EnvelopeIcon,
    IdentificationIcon,
    "v-button": Button,
    InputField,
    Multiselect,
  },
  data() {
    return {
      value: [
        "ACTION"
      ],
       options: [
       "ACTION",
       "COMEDY",
       "FANTASY"
      ],
    };
  },
  props: {
    type: {
      required: true,
      type: String,
    },
    id: {
        required: false,
        type: Number
    }
  },
  methods: {
    addTag (newTag: string) {
      const tag = newTag
      this.options.push(tag)
      this.value.push(tag)
    },
    create(e: Event) {
      e.preventDefault()
      
      const payload = {
        title: this.title,
        description: this.description,
        imageUrl: this.imageUrl,
        director: this.director,
        genres: this.value,
        year: this.year
      }
      if (this.type === "CREATE") {
        axios.post("http://localhost:8080/api/catalog/create_film", payload)
        .then((res) => {
            this.showSuccessToast("Succesfully added " +res.data.title)
        })
        .catch((error) => {
            console.log("error", error)
            this.showErrorToast(error.message);
        })
      } else {
        axios.put("http://localhost:8080/api/catalog/update_film/"+this.id, payload)
        .then((res) => {
            this.showSuccessToast("Succesfully updated " +res.data.title)
        })
        .catch((error) => {
            console.log("error", error)
            this.showErrorToast(error.message);
        })  
      }
      
    }
  },
  setup(props) {
    var title = ref('');
    var description = ref('');
    var imageUrl = ref('');
    var director = ref('');
    var genres:string[] = [];
    var year = 1999;
    if (props.type === "UPDATE") {
        axios.get('http://localhost:8080/api/catalog/'+props.id).then(
            response => {
                title = response.data.title;
                description = response.data.description;
                imageUrl = response.data.imageUrl;
                director = response.data.director;
                genres = response.data.genres;
                year = response.data.year;
            }
        )
         
    }
    

    const toast = useToast();
    
    const showSuccessToast = (message: string) => {
      toast.success(message);
    };

    const showErrorToast = (message: string) => {
      toast.error(message);
    };

    return {
      title,
      description,
      imageUrl,
      genres,
      director,
      year,
      showSuccessToast,
      showErrorToast
    };
  }
    
  
  
})

</script>

    


<template>
    <slot></slot>
    
    <div class = "flex py-14 mx-0 justify-center">
        <form class = "flex flex-col max-w-5xl w-full mx-0 gap-y-8 items-center" action = "/" :onSubmit="create">
            <InputField type="text" placeholder="Title" v-on:update:inp="title = $event" v-bind:inp="title"> 
              <IdentificationIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
            </InputField>
            <div class="items-center gap-x-4 w-full mx-0 relative">
                <label class="typo__label">Year</label>
                <input type="number" placeholder="Year" v-model="year" class = "px-6 py-4 bg-[#3F4152] rounded-lg placeholder:text-[#9C9C9C] text-light-grey w-full" required> 
            </div>
            <InputField type="text" placeholder="Director" v-on:update:inp="director = $event" v-bind:inp="director"> 
              <LockClosedIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
            </InputField>
            <InputField type="url" placeholder="Url for Cover Image" v-on:update:inp="imageUrl = $event" v-bind:inp="imageUrl"> 
              <EnvelopeIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
            </InputField>

            <div class="flex items-center gap-x-4 w-full mx-0 relative">
                <textarea type="text" placeholder="Description" v-model="description" class = "px-6 py-4 bg-[#3F4152] rounded-lg placeholder:text-[#9C9C9C] text-light-grey w-full" required> </textarea>
            </div>

            
            
            
            <div>
                <label class="typo__label">Genres</label>
                <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a genre" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>

            </div>
            <v-button type="indigo" className = "text-center flex justify-center w-fit"> Save </v-button>
        </form>
    </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>