<script lang="ts">
import { defineComponent} from 'vue';
import axios from 'axios';
import ReviewCard from "@/components/common/ReviewCard.vue";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
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
  }, methods: {
    handleVoteChange(type: string, reviewId: number) {
      // Update the state based on the type and review ID received
      const review: Review | undefined = this.reviews.find(item => item.id === reviewId);
      const foundReview: Review = review ?? {} as Review;
      let isVoted = true;
      let message = "";

      if (type === "upvote") {
        message = "Berhasil upvote review";
        if (foundReview.isUpvote) {
          foundReview.isUpvote = false;
          foundReview.isVoted = false;
          foundReview.upvote--;
          message = "Berhasil membatalkan vote";
        } else if (foundReview.isVoted){
          foundReview.isUpvote = true;
          foundReview.upvote++;
          foundReview.downvote--;
        } else {
          foundReview.isUpvote = true;
          foundReview.isVoted = true;
          foundReview.upvote++;
          isVoted = false;
        }
      } else {
        message = "Berhasil downvote review";
        if (foundReview.isUpvote){
          foundReview.isUpvote = false;
          foundReview.upvote--;
          foundReview.downvote++;
        }
        else if (foundReview.isVoted) {
          foundReview.isVoted = false;
          foundReview.downvote--;
          isVoted = true;
          message = "Berhasil membatalkan vote";
        }
        else {
          foundReview.isUpvote = false;
          foundReview.isVoted = true;
          foundReview.downvote++;
          isVoted = false;
        }
      }
      axios.post(`${this.baseReviewUrl}/${type}-review/`, {
        isVoted: `${isVoted}`,
        reviewId: reviewId
      }, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
          .then(() => {
            this.showSuccessToast(message);
          })
          .catch((error) => {
            console.log("error", error.response.data.message)
            this.showErrorToast(error.response.data.message);
          })

    }
  },
  setup() {
    const baseReviewUrl = "http://34.143.188.191/api/review";
    const splittedURL = window.location.pathname.split('/');
    const seriesId = splittedURL[splittedURL.length - 1];
    const toast = useToast();

    const showSuccessToast = (message: string) => {
      toast.success(message);
    };

    const showErrorToast = (message: string) => {
      toast.error(message);
    };

    return {
      baseReviewUrl,
      seriesId,
      showSuccessToast,
      showErrorToast
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
                    @state-change="handleVoteChange"
        ></ReviewCard>
      </div>
      <div v-if="reviews.length === 0">
        There's no reviews yet
      </div>
    </div>
  </div>
</template>