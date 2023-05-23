<script lang="ts">
import { defineComponent} from 'vue';
import axios from 'axios';
import ReviewCard from "@/components/common/ReviewCard.vue";

interface Review {
  id: number;
  username: string;
  reviewContent: string;
  seriesId: number;
}

export default defineComponent ({
  name: "ReviewAllView",
  components: {
    ReviewCard
  },
  setup() {
    const myUsername = "naila";
    const baseReviewUrl = "http://localhost:8080/api/review";
    const splittedURL = window.location.pathname.split('/');
    const seriesId = splittedURL[splittedURL.length - 1];

    return {
      myUsername,
      baseReviewUrl,
      seriesId
    }
  },

  data() {
    return {
      reviews: [] as Review[],
      isDataLoaded: false
    };
  },

  mounted() {
    setTimeout(() => {
      this.isDataLoaded = true;
    }, 2000);

    // 1. Get Review by Series ID
    axios.get(`${this.baseReviewUrl}/series_id/${this.seriesId}`, {
    })
        .then((response) => {
          console.log(response.data);
          this.reviews = response.data;
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
        <ReviewCard :review=review.reviewContent :username=review.username></ReviewCard>
      </div>
    </div>
  </div>
</template>