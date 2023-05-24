<script lang="ts">
import { defineComponent} from 'vue';
import axios from 'axios';
import ReviewCard from "@/components/common/ReviewCard.vue";
import Cookies from 'js-cookie';

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
  setup() {
    const baseReviewUrl = "http://34.143.188.191/api/review";
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
    setTimeout(() => {
      this.isDataLoaded = true;
    }, 2000);

    this.token = Cookies.get('token') || "";

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