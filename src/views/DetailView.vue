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
    }
  }
})

const url = window.location.pathname
var splittedURL = url.split('/')
const baseReviewUrl = "http://localhost:8080/api/review";
const baseVoteUrl = "http://localhost:8080/api/vote";
const seriesId = splittedURL[splittedURL.length - 1];

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