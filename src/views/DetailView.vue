<script lang="ts">
import type { Ref } from 'vue';
import {defineComponent, ref} from "vue";
import ReviewCard from "@/components/common/ReviewCard.vue";
import VoteButton from "@/components/common/VoteButton.vue";
import axios from "axios";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

interface Series {
  title: string;
  id: number;
  description: string;
  year: number;
  genres: string[];
  imageUrl: string;
  type: string;
  author: string;
  producer: string;
  director: string;
  volumes: number;
  chapters: number;
  seasons: number;
  episodes: number;
}

export default defineComponent({
  name: "DetailView",
  components: {
    VoteButton,
    ReviewCard

  }, methods: {
    voteClick(type: String) {
      if (type === "upvote") {
        this.isUpvote=true;
        this.isVoted=true;
      } else {
        this.isUpvote=false;
        this.isVoted=true;
      }
      console.log("isUpvote: " + this.isUpvote.valueOf);
      console.log("isVoted: " + this.isVoted.valueOf);
    },
    capitalized(str: String) {
      const allLowerCase = str.toLowerCase();
      const capitalizedFirst = allLowerCase[0].toUpperCase();
      const rest = allLowerCase.slice(1);

      return capitalizedFirst+rest;
    },
    
    openDialog() {
        this.isOpen = true;
      },
      closeDialog(userChoice: Boolean) {
        this.isOpen = false;
        if (userChoice) {
          axios.delete("http://localhost:8080/api/catalog/delete_series/"+this.data.id)
        .then((res) => {
            this.showSuccessToast(res.data)
            this.$router.push('/catalog/');
        })
        .catch((error) => {
            console.log("error", error)
            this.showErrorToast(error.message);
        })
        }
      }
  },
  setup() {
    const isUpvote = ref(false);
    const isVoted  = ref(false);
    const toast = useToast();
    
    const showSuccessToast = (message: string) => {
      toast.success(message);
    };

    const showErrorToast = (message: string) => {
      toast.error(message);
    };
      return {
      isUpvote,
      isVoted,
      showSuccessToast,
      showErrorToast
    };
  },

  data() {
    return {
      data: {} as Series,
      isOpen: false,
    }
  },

  async mounted() {
    await axios
        .get(`${baseCatalogUrl}/${this.$route.params.id}`)
        .then(response => (this.data = response.data))

    }
})


// ---- | ----
const url = window.location.pathname
var splittedURL = url.split('/')
const baseReviewUrl = "http://localhost:8080/api/review";
const baseVoteUrl = "http://localhost:8080/api/vote";
const seriesId = splittedURL[splittedURL.length - 1];

const baseCatalogUrl = "http://localhost:8080/api/catalog";

// 1. Get Review by Series ID
axios.get(`${baseReviewUrl}/series_id/${seriesId}`, {
})
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
// 2. Get my Review by Series ID
axios.get(`${baseReviewUrl}/series_id/${seriesId}/me`, {
  params: {
    username: 'naila'
  },
})
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
// 3. Get Vote Count by Series ID
axios.get(`${baseVoteUrl}/series_id/${seriesId}`, {
})
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
// 4. Get My Vote by Series ID
axios.get(`${baseVoteUrl}/series_id/${seriesId}/me`, {
  params: {
    username: 'naila'
  },
})
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
</script>

<template>
   
  <div>
    <div class="container">
      <div class="poster">
        <img v-bind:src="data['imageUrl']" alt="image"/>
      </div>
      <div class="info">
        <div class="series-title">{{ data['title'] }}</div>
        <div class="series-detail">
          <div class="set">
            <label>Genre: </label>
            <span v-for="genre in data['genres']">{{ capitalized(genre)+ " " }} </span>
          </div>
          <div class="set">
            <label>Creator</label>
            <span>{{ data['author'] }} {{ data['producer'] }} {{ data['director'] }}</span>
          </div>
          <div class="set">
            <label>Series ID: </label>
            <span>{{ data['id'] }}</span>
          </div>
          <div class="set">
            <label>Type: </label>
            <span>{{ data['type'] }}</span>
          </div>
          <div class="set">
            <label v-if="data['type'] === `SHOW`">Season(s): {{ data['seasons'] }}</label>
            <label v-if="data['type'] === `BOOK`">Volume(s): {{ data['volumes'] }}</label>
          </div>
          <div class="set">
            <label v-if="data['type'] === `SHOW`">Episode(s): {{ data['episodes'] }}</label>
            <label v-if="data['type'] === `BOOK`">Chapter(s): {{ data['chapters'] }}</label>
          </div>
        </div>
        <div class="series-description">Description:</div>
        <div class="series-description-text">{{ data['description'] }} </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row md:flex-row gap-20 my-6">
      <div class="flex flex-col gap-10">
        <div class="text-white lg:text-4xl text-2xl font-bold lg:text-left">Votes</div>
        <!-- Dua button untuk votes -->
        <div class="flex flex-row gap-5 justify-center">
          <VoteButton :count=3 :isClicked=isUpvote type="upvote" @click="voteClick('upvote')"></VoteButton>
          <VoteButton :count=3 :isClicked=!isUpvote&&isVoted type="downvote" @click="voteClick('downvote')"></VoteButton>
        </div>

      </div>
      <div class="flex flex-col gap-10">
        <div class="flex flex-row justify-between">
          <div class="text-white lg:text-4xl text-2xl font-bold lg:text-left">Your Review</div>
          <router-link :to="'/catalog/update/'+ data['type'] +'/' + data['id']">
            <a class="text-indigo lg:text-3xl md:text-xl text-xl font-bold">Edit</a>
          </router-link>
          <button @click="openDialog" class="text-indigo lg:text-3xl md:text-xl text-xl font-bold">
            Delete
          </button>
          
            <!-- Dialog  -->
            <div class="fixed inset-0 flex items-center justify-center z-50" v-if="isOpen">
              <div class="bg-grey rounded-lg p-4">
                <!-- Dialog content goes here -->
                <h2>Are you sure you want to delete this series from the database?</h2>
                <div class="flex justify-end mt-4">
                  <button class="bg-red-400 hover:bg-red-800 rounded px-4 py-2 mr-2" @click="closeDialog(false)">No</button>
                  <button class="bg-purple-700 hover:bg-purple-900 text-white rounded px-4 py-2" @click="closeDialog(true)">Yes</button>
                </div>
              </div>
            </div>

         
          
        </div>
        <ReviewCard review="my review" username="my-username"></ReviewCard>
      </div>
    </div>
    <div class="flex flex-col gap-10 mt-20 min-w-full max-w-[640px]">
      <div class="text-white lg:text-4xl text-2xl font-bold lg:text-left">Other Reviews</div>
      <!-- review card untuk setiap review -->
      <ReviewCard review="hashdhshdhs" username="useued"></ReviewCard>
      <a class="text-indigo lg:text-3xl md:text-xl text-xl font-bold">See all</a>
    </div>
  </div>

</template>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: -30px;
  column-gap: 10px;
}

.container .poster {
  flex: 1;
}

.container .poster img {
  border-radius: 10px;
}

.container .info {
  color: whitesmoke;
  flex: 2;
  background-color: #323443;
  border-radius: 15px;
  padding-bottom: 10px;
  padding-left: 2%;
  padding-right: 2%;
}

.container .info .set, .container .info .series-description, .container .info .series-description-text{
  text-align: justify;
  
}

.container .info .series-title {
  text-align: center;
  font-size: 25px;
}

@media (max-width: 800px) {
  .container {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .container .info .set, .container .info .series-description, .container .info .series-description-text{
    text-align: justify;
    padding-left: 1%;
  }

  .container .info .series-title {
    text-align: center;
  }

  .container .poster {
    justify-items: center;
    flex: 1;
  }

  .container .info {
    flex: 1;
    margin-top: 20px;
  }


}
</style>