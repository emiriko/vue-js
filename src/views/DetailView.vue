<script lang="ts">
import type { Ref } from 'vue';
import {defineComponent, ref} from "vue";
import ReviewCard from "@/components/common/ReviewCard.vue";
import VoteButton from "@/components/common/VoteButton.vue";
import axios from "axios";

var isUpvote: Ref<boolean> = ref<boolean>(false);
var isVoted: Ref<boolean> = ref<boolean>(false);

export default defineComponent({
  name: "DetailView",
  components: {
    VoteButton,
    ReviewCard

  }, methods: {
    voteClick(type: String) {
      if (type === "upvote") {
        isUpvote=ref<boolean>(true);
        isVoted=ref<boolean>(true);
      } else {
        isUpvote=ref<boolean>(false);
        isVoted=ref<boolean>(true);
      }
      console.log("isUpvote: " + isUpvote.value);
      console.log("isVoted: " + isVoted.value);
    },
    capitalized(str: String) {
      const allLowerCase = str.toLowerCase();
      const capitalizedFirst = allLowerCase[0].toUpperCase();
      const rest = allLowerCase.slice(1);

      return capitalizedFirst+rest;
    },
  },

  data() {
    return {
      data: []
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
        <img v-bind:src="data.imageUrl" alt="image"/>
      </div>
      <div class="info">
        <div class="series-title">{{ data.title }}</div>
        <div class="series-detail">
          <div class="set">
            <label>Genre: </label>
            <span v-for="genre in data.genres">{{ capitalized(genre)+ " " }} </span>
          </div>
          <div class="set">
            <label>Creator</label>
            <span>{{ data.author }} {{ data.producer }} {{ data.director }}</span>
          </div>
          <div class="set">
            <label>Series ID: </label>
            <span>{{ data.id }}</span>
          </div>
          <div class="set">
            <label>Type: </label>
            <span>{{ data.type }}</span>
          </div>
          <div class="set">
            <label v-if="data.type === `SHOW`">Season(s): {{ data.seasons }}</label>
            <label v-if="data.type === `BOOK`">Volume(s): {{ data.volumes }}</label>
          </div>
          <div class="set">
            <label v-if="data.type === `SHOW`">Episode(s): {{ data.episodes }}</label>
            <label v-if="data.type === `BOOK`">Chapter(s): {{ data.chapters }}</label>
          </div>
        </div>
        <div class="series-description">Description:</div>
        <div class="series-description-text">{{ data.description }} iiais bdabsdibasdabsdi baisbdass bdiabsdbasd nasi ndasndiasnd asidbaisbdisaa </div>
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
          <a class="text-indigo lg:text-3xl md:text-xl text-xl font-bold">Edit</a>
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