<script lang="ts">
import { defineComponent} from 'vue';
import axios from 'axios';
import ReviewCard from "@/components/common/ReviewCard.vue";


interface Review {
  id: number;
  username: string;
  reviewContent: string;
  seriesId: number;
  upvote: number;
  downvote: number;
  isUpvote: boolean;
  isVoted: boolean;
}


export default defineComponent ({
  name: "ReviewAllView",
  components: {
    ReviewCard
  },
  methods: {
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
    }
  },
  setup() {
    const baseReviewUrl = "http://localhost:8081/api/review";
    const splittedURL = window.location.pathname.split('/');
    const seriesId = splittedURL[splittedURL.length - 1];

    return {
      baseReviewUrl,
      seriesId
    }
  },

  data() {
    return {
      reviews: [] as Review[],
      isDataLoaded: false,
      myReview: {} as Review,
      token: ""
    };
  },

  mounted() {
    // document.cookie = 'token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYWlsYSIsImlhdCI6MTY4NDgzMjM2OCwiZXhwIjoxNjg0ODMzODA4fQ.l8cmZZ-jefKQ0QuC6i8ycqq9rS3_AJcPRPchLchfffA; path=/;';

    setTimeout(() => {
      this.isDataLoaded = true;
    }, 2000);

    this.token = this.getCookieValue("token");
    console.log(this.token);

    // 1. Get Review by Series ID
    axios.get(`${this.baseReviewUrl}/series_id/${this.seriesId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
        .then((response) => {
          console.log(response.data);
          this.reviews = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

    // 2. Get my Review by Series ID
    axios.get(`${this.baseReviewUrl}/series_id/${this.seriesId}/me`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
        .then((response) => {
          console.log(response.data);
          this.myReview = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
  },
})
</script>


<template>
  <div>
    <div class="text-white lg:text-4xl text-4xl font-bold lg:text-left m-5">All Reviews</div>
    <div v-if="isDataLoaded">
      <div v-for="review in reviews" :key="review.id">
        <ReviewCard :review=review.reviewContent
                    :username=review.username
                    :downvote="review.downvote"
                    :id="review.id"
                    :is-upvote="review.isUpvote"
                    :is-voted="review.isVoted"
                    :my-username="myReview.username"
                    :upvote="review.upvote"
                    class="mb-6"
        ></ReviewCard>
      </div>
      <div v-if="reviews.length === 0">
        There's no reviews yet
      </div>
    </div>
  </div>
</template>