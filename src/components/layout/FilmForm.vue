

<script lang="ts">

import { defineComponent, ref, onMounted } from 'vue';
import Button from '@/components/common/Button.vue';
import { PhotoIcon, FilmIcon, UserCircleIcon, DocumentTextIcon } from '@heroicons/vue/24/solid';
import InputField from '@/components/common/InputField.vue';
import axios from 'axios';
import {Multiselect} from 'vue-multiselect';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const baseCatalogUrl = "http://34.87.103.104/api/catalog";



export default defineComponent({
  name: 'Film Form',
  components: {
    UserCircleIcon,
    DocumentTextIcon,
    PhotoIcon,
    FilmIcon,
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
       "FANTASY",
       "DOCUMENTARY",
       "MYSTERY",
       "SCIFI",
       "ROMANCE",
       "HORROR",
       "THRILLER",
       "DRAMA",
       "HISTORICAL",
      ],
      token: ""
    };
  },
  mounted() {
        this.token = this.getCookieValue("token");
    
  },
  props: {
    method: {
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
    async create(e: Event) {
      e.preventDefault()
      
      const payload = {
        title: this.title,
        description: this.description,
        imageUrl: this.imageUrl,
        director: this.director,
        genres: this.value,
        year: this.year
      }
      if (this.method === "POST") {
        await axios.post(`${baseCatalogUrl}/create_film`, payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`,
          }
        })
        .then((res) => {
            this.showSuccessToast("Succesfully added " +res.data.title)
            this.$router.push('/catalog/');
        })
        .catch((error) => {
            console.log("error", error)
            this.showErrorToast(error.message);
        })
      } else {
        await axios.put(`${baseCatalogUrl}/update_film/${this.id}`, payload, 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
          }
        })
        .then((res) => {
            this.showSuccessToast("Succesfully updated " +res.data.title)
            this.$router.push('/catalog/'+res.data.id);
        })
        .catch((error) => {
            console.log("error", error)
            this.showErrorToast(error.message);
        })  

        
      }
      
    },
    getCookieValue(cookieName: String) {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Check if the cookie starts with the specified name
        if (cookie.startsWith(cookieName + '=')) {
          // Return the value of the cookie
          return cookie.substring(cookieName.length + 1);
        }
      }
      // Cookie not found
      return "";
    },
  },
  setup(props) {
    const title = ref('');
    const description = ref('');
    const imageUrl = ref('');
    const director = ref('');
    const genres:string[] = [];
    const year = ref(0);
    if (props.method === "PUT") {
      const fetchData = async () => {
        try {
            const response = await axios.get(`${baseCatalogUrl}/${props.id}`);
            // Assign the response data to the variables
            title.value = response.data.title;
            description.value = response.data.description;
            imageUrl.value = response.data.imageUrl;
            director.value = response.data.director;
            genres.values = response.data.genres;
            year.value = response.data.year;
          } catch (error) {
            console.error(error);
          }
        };

        // Fetch data on component mount using onMounted()
        onMounted(fetchData);

      
         
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
              <FilmIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
            </InputField>
            <div class="flex items-center gap-x-4 w-full mx-0 relative">
                <label class="typo__label">Year</label>
                <input type="number" placeholder="Year" v-model="year" class = "px-6 py-4 bg-[#3F4152] rounded-lg placeholder:text-[#9C9C9C] text-light-grey w-full" required> 
            </div>
            <InputField type="text" placeholder="Director" v-on:update:inp="director = $event" v-bind:inp="director"> 
              <UserCircleIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
            </InputField>
            <InputField type="url" placeholder="Url for Cover Image" v-on:update:inp="imageUrl = $event" v-bind:inp="imageUrl"> 
              <PhotoIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none" />
            </InputField>

            <div class="flex items-center gap-x-4 w-full mx-0 relative">
              <textarea type="text" placeholder="Description" v-model="description" class = "px-6 py-4 bg-[#3F4152] rounded-lg placeholder:text-[#9C9C9C] text-light-grey w-full" required> </textarea>
              <DocumentTextIcon class="w-5 h-5 absolute right-0 mr-6 pointer-events-none"/>

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