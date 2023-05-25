<script lang="ts">
import {defineComponent, ref} from "vue";
import ReviewCard from "@/components/common/ReviewCard.vue";
import VoteButton from "@/components/common/VoteButton.vue";
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import axios from "axios";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import Cookies from 'js-cookie';

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

interface User {
  name: string;
  email: string;
  role: string;
  username: string
}
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

interface Vote {
  username: string;
  isUpvote: boolean;
  seriesId: number;
}

export default defineComponent({
  name: "DetailView",
  components: {
    VoteButton,
    ReviewCard,
    PencilIcon,
    TrashIcon,
  }, 
  methods: {
    voteClick(type: string) {
      if (this.token == "") {
        this.showErrorToast("Please sign in first");
        return;
      }
      if (Object.keys(this.myVote).length === 0) {
        let upvoteTemp = this.upvoteCount;
        let downvoteTemp = this.downvoteCount;
        let isUpvote = true;
        if (type === "upvote") {
          this.upvoteCount++;
        } else {
          this.downvoteCount++;
          isUpvote = false;
        }
        axios.post(`${this.baseVoteUrl}/vote`, {
          isUpvote: `${isUpvote}`,
          seriesId: this.seriesId
        }, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
            .then((res) => {
              this.myVote = res.data;
            })
            .catch((error) => {
              console.log("error", error.response.data.message)
              this.showErrorToast(error.response.data.message);
              this.myVote = {} as Vote;
              this.upvoteCount = upvoteTemp;
              this.downvoteCount = downvoteTemp;
            })
        return;
      }
      else if (type === "upvote" && !this.myVote.isUpvote) {
        this.myVote.isUpvote=true;
        this.upvoteCount++;
        this.downvoteCount--;
      } else if (type === "downvote" && this.myVote.isUpvote){
        this.myVote.isUpvote=false;
        this.upvoteCount--;
        this.downvoteCount++;
      } else {
        return;
      }
      axios.put(`${this.baseVoteUrl}/update/series_id/${this.seriesId}`, {}, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
          .catch((error) => {
            console.log("error", error.response.data.message)
            this.showErrorToast(error.response.data.message);
          });
    },
    capitalized(str: string) {
      const allLowerCase = str.toLowerCase();
      const capitalizedFirst = allLowerCase[0].toUpperCase();
      const rest = allLowerCase.slice(1);

      return capitalizedFirst+rest;
    },
    openDialog() {
        this.isOpen = true;
      },
      closeDialog(userChoice: boolean) {
        this.isOpen = false;
        if (userChoice) {
          axios.delete(`${this.baseCatalogUrl}/delete_series/${this.seriesId}`,{
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then((res) => {
            this.showSuccessToast(res.data)
            this.$router.push('/catalog/');
        })
        .catch((error) => {
            console.log("error", error.response.data.message)
            this.showErrorToast(error.response.data.message);
        })
        }
      },
    openDialogDeleteReview() {
      this.isOpenDeleteReview = true;
    },
    closeDialogDeleteReview(userChoice: boolean) {
      let myUsername = this.myReview.username;
      this.isOpenDeleteReview = false;
      if (userChoice) {
        axios.delete(`${this.baseReviewUrl}/delete/${this.myReview.id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
            .then(() => {
              this.showSuccessToast("Berhasil menghapus review");
              this.myReview = {} as Review;
            })
            .catch((error) => {
              console.log("error", error.response.data.message)
              this.showErrorToast(error.response.data.message);
            })
      }
    },
    openDialogPostReview() {
      this.isOpenPostReview = true;
    },
    closeDialogPostReview(userChoice: boolean) {
      this.isOpenPostReview = false;
      if (userChoice) {
        if (this.token == "") {
          this.showErrorToast("Please sign in first");
          this.myReview = {} as Review;
          return;
        }
        axios.post(`${this.baseReviewUrl}/create`, {
          reviewContent: this.myReview.reviewContent,
          seriesId: this.seriesId
        }, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
            .then((res) => {
              this.showSuccessToast("Berhasil membuat review");
              this.myReview = res.data;
            })
            .catch((error) => {
              console.log("error", error.response.data.message)
              this.showErrorToast(error.response.data.message);
              this.myReview = {} as Review;
            })
      } else {
        this.myReview = {} as Review;
      }
    },
    openDialogEditReview() {
      this.isEditReview = true;
    },
    closeDialogEditReview() {
      this.isEditReview = false;
      axios.put(`${this.baseReviewUrl}/update/${this.myReview.id}`, {
        reviewContent: this.myReview.reviewContent,
        seriesId: this.seriesId
      }, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
          .then((res) => {
            this.showSuccessToast("Berhasil mengedit review");
            this.myReview = res.data;
          })
          .catch((error) => {
            console.log("error", error.response.data.message)
            this.showErrorToast(error.response.data.message);
          })
    },
    handleVoteChange(type: string, reviewId: number) {
      if (this.token == "") {
        this.showErrorToast("Please sign in first");
        return;
      }
      // Update the state based on the type and review ID received
      const review: Review | undefined = this.reviews.find(item => item.id === reviewId);
      const foundReview: Review = review ?? {} as Review;
      let isVoted = true;
      let message = "";
      let upvoteTemp = foundReview.upvote;
      let downvoteTemp = foundReview.downvote;

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
            foundReview.upvote = upvoteTemp;
            foundReview.downvote = downvoteTemp;
          })

      },
    createProgress(e: Event) {
      this.create = false;
      e.preventDefault()
      
      const body = {
        status: this.status,
        episodeOrChapter: this.episodeOrChapter,
        seasonOrVolume: this.seasonOrVolume,
      }
      axios.post(`${this.baseProgressUrl}/create/${this.seriesId}`, body,
      { headers: {
        Authorization: `Bearer ${this.token}`,
      }
    })
      .then((res) => {
          this.showSuccessToast("Succesfully added to progress")
          this.progressNotExist=false
      })
      .catch((error) => {
          console.log("error", error)
          this.showErrorToast(error.message);
      })}
      
  },
  
  setup() {
    const upvoteCount  = ref(0);
    const downvoteCount  = ref(0);
    var episodeOrChapter = ref(0);
    var seasonOrVolume = ref(0);
    var status = ref('');
    const isUpvote = ref(false);
    const isVoted  = ref(false);
    const toast = useToast();

    const showSuccessToast = (message: string) => {
      toast.success(message);
    };

    const splittedURL = window.location.pathname.split('/');
    const baseReviewUrl = "http://34.143.188.191/api/review";
    const baseVoteUrl = "http://34.143.188.191/api/vote";
    const baseProgressUrl = "http://34.143.188.191/api/progress";
    const seriesId = splittedURL[splittedURL.length - 1];
    const baseAuthUrl = "http://34.124.246.185/api/auth";
    const baseCatalogUrl = "http://34.87.103.104/api/catalog";

    const showErrorToast = (message: string) => {
      toast.error(message);
    };
      return {
      upvoteCount,
      downvoteCount,
      showSuccessToast,
      showErrorToast,
      episodeOrChapter,
      seasonOrVolume,
      status,
      baseReviewUrl,
      baseVoteUrl,
      seriesId,
      baseAuthUrl,
      baseCatalogUrl,
      baseProgressUrl
    };

  },

  data() {
    return {
      data: {} as Series,
      isOpen: false,
      currentUser: {
      } as User,
      create: false,
      progressNotExist: false,
      reviews: [] as Review[],
      myReview: {} as Review,
      myVote: {} as Vote,
      isDataLoaded: false,
      isOpenDeleteReview: false,
      isOpenPostReview: false,
      isEditReview: false,
      token: ""
    }
  },

  mounted() {
    setTimeout(() => {
      this.isDataLoaded = true;
    }, 2000);

    this.token = Cookies.get('token') || "";
    console.log(this.token);

    axios
        .get(`${this.baseAuthUrl}/verify`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
        .then(response => (this.currentUser = response.data.user))
        .catch((error) => {
          console.log(error);
        });

    axios
        .get(`${this.baseCatalogUrl}/${this.$route.params.id}`)
        .then(response => (this.data = response.data))
        .catch((error) => {
          console.log(error);
        });



    // 1. Get my Review by Series ID
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

    // 2. Get Review by Series ID
    axios.get(`${this.baseReviewUrl}/series_id/${this.seriesId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
        .then((response) => {
          console.log(response.data);
          this.reviews = response.data.filter((item: Review) => item.username != this.currentUser.username);
        })
        .catch((error) => {
          console.log(error);
        });

    // 3. Get Vote Count by Series ID
    axios.get(`${this.baseVoteUrl}/series_id/${this.seriesId}`, {
    })
        .then((response) => {
          console.log(response.data);
          this.upvoteCount = response.data.upvote;
          this.downvoteCount = response.data.downvote;
        })
        .catch((error) => {
          console.log(error);
        });

    // 4. Get My Vote by Series ID
    axios.get(`${this.baseVoteUrl}/series_id/${this.seriesId}/me`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
        .then((response) => {
          console.log(response.data);
          this.myVote = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

    // Check progress
    axios.get(`${this.baseProgressUrl}/${this.seriesId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.progressNotExist=true;
          console.log(error);
        });
  }
})

</script>

<template>

  <div>
    <div class="container mb-5">
      <div class="poster">
        <img v-bind:src="data.imageUrl" alt="image"/>
      </div>
      <div class="info">
        <div class="series-title text-white lg:text-4xl text-2xl font-bold lg:text-left">{{ data['title'] }} ({{ data['year'] }})</div>
        <div class="series-admin flex space-x-4" v-if="currentUser['role'] === 'ADMIN'">
          <router-link :to="'/catalog/update/'+ data['type'] +'/' + data['id']">
            <PencilIcon class="w-8 h-8  text-indigo"></PencilIcon>
          </router-link>
          <button @click="openDialog">
            <TrashIcon class="w-8 h-8  text-indigo"></TrashIcon>
          </button>
        </div>
        <div class="series-detail">
          <div class="set">
            <label>Genre: </label>
            <span v-for="genre in data.genres">{{ capitalized(genre)+ " " }} </span>
          </div>
          <div class="set">
            <label>Creator: </label>
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
        <div class="series-description-text">{{ data['description'] }} </div>
        
        <button @click="create=true" class="text-indigo lg:text-2xl md:text-xl text-xl font-bold" v-if="progressNotExist">Add to Progress</button>
              <!-- Dialog to add progress  -->
            <div class="fixed inset-0 flex items-center justify-center z-10" v-if="create">
              <div class="bg-grey border-2 rounded-lg p-4">
                <!-- Dialog content goes here -->
                <form :onSubmit="createProgress">
                  <h5 class = "capitalize text-3xl font-bold text-white w-full"> Create Progress </h5>
                  
                  <div v-if="data['type'] != `FILM`">Season or Volume: 
                    <select class="bg-grey rounded-lg" v-if="data['type'] === `SHOW`" v-model="seasonOrVolume" required>
                      <option v-for="season in data['seasons']" :value="season">{{season}}</option>
                    </select>
                    <select class="bg-grey rounded-lg" v-if="data['type'] === `BOOK`" v-model="seasonOrVolume" required>
                      <option v-for="volume in data['volumes']" :value="volume">{{volume}}</option>
                    </select>
                  </div>
                  <div v-if="data['type'] != `FILM`">Episode or Chapter: 
                    <select class="bg-grey rounded-lg" v-if="data['type'] === `SHOW`" v-model="episodeOrChapter" required>
                      <option v-for="episode in data['episodes']" :value="episode">{{episode}}</option>
                    </select>
                    <select class="bg-grey rounded-lg" v-if="data['type'] === `BOOK`" v-model="episodeOrChapter" required>
                      <option v-for="chapter in data['chapters']" :value="chapter">{{chapter}}</option>
                    </select>
                  </div>
                  <div>Status: 
                    <select class="bg-grey rounded-lg" v-model="status" required>
                      <option value="PLAN_TO_WATCH">Plan to watch</option>
                      <option value="WATCHING">Watching</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="DROPPED">Dropped</option>
                    </select>
                  </div>
                  <div class="flex justify-end mt-4">
                    <button class="bg-red-400 hover:bg-red-800 rounded px-4 py-2 mr-2" @click="create=false">Cancel</button>
                    <button type="submit" class="bg-purple-700 hover:bg-purple-900 text-white rounded px-4 py-2">Add</button>
                  </div>
                </form>
              </div>
            </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row md:flex-row gap-20 my-20">
      <div class="flex flex-col gap-10">
        <div class="text-white lg:text-4xl text-2xl font-bold lg:text-left">Votes</div>
        <!-- Dua button untuk votes -->
        <div class="flex flex-row gap-5 justify-center">
          <VoteButton :count=upvoteCount :isClicked=myVote.isUpvote type="upvote" @click="voteClick('upvote')"></VoteButton>
          <VoteButton :count=downvoteCount :isClicked="!myVote.isUpvote&&(Object.keys(myVote).length !== 0)" type="downvote" @click="voteClick('downvote')"></VoteButton>
        </div>

      </div>
      <div class="flex flex-col gap-10">
        <div class="flex flex-row justify-between">
          <div class="text-white lg:text-4xl text-2xl font-bold lg:text-left">Your Review</div>
          <div v-if="Object.keys(myReview).length !== 0" class="flex gap-4">
            <button @click="openDialogEditReview" class="text-indigo lg:text-3xl md:text-xl text-xl font-bold">
              Edit
            </button>
            <button @click="openDialogDeleteReview" class="text-indigo lg:text-3xl md:text-xl text-xl font-bold">
              Delete
            </button>
          </div>
          
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

          <!-- Dialog Delete Review -->
          <div class="fixed inset-0 flex items-center justify-center z-50" v-if="isOpenDeleteReview">
            <div class="bg-grey rounded-lg p-4">
              <!-- Dialog content goes here -->
              <h2>Are you sure you want to delete your review?</h2>
              <div class="flex justify-end mt-4">
                <button class="bg-red-400 hover:bg-red-800 rounded px-4 py-2 mr-2" @click="closeDialogDeleteReview(false)">No</button>
                <button class="bg-purple-700 hover:bg-purple-900 text-white rounded px-4 py-2" @click="closeDialogDeleteReview(true)">Yes</button>
              </div>
            </div>
          </div>

          <!-- Dialog  Post Review -->
          <div class="fixed inset-0 flex items-center justify-center z-50" v-if="isOpenPostReview">
            <div class="bg-grey rounded-lg p-4">
              <!-- Dialog content goes here -->
              <h2 class="text-white text-2xl font-bold m-4">Post Your Review</h2>
              <textarea id="reviewContent" cols="40" rows="5" required v-model="myReview.reviewContent" class = "px-6 py-4 bg-[#3F4152] rounded-lg placeholder:text-[#9C9C9C] text-light-grey w-full" placeholder="Your review goes here..."></textarea>
              <div class="flex justify-end mt-4 gap-4">
                <button class="bg-purple-700 hover:bg-purple-900 text-white rounded px-4 py-2" @click="closeDialogPostReview(false)">Cancel</button>
                <button class="bg-red-400 hover:bg-red-800 rounded px-4 py-2 mr-2 text-white" @click="closeDialogPostReview(true)">Post</button>
              </div>
            </div>
          </div>

          <!-- Dialog  Edit Review -->
          <div class="fixed inset-0 flex items-center justify-center z-50" v-if="isEditReview">
            <div class="bg-grey rounded-lg p-4">
              <!-- Dialog content goes here -->
              <h2 class="text-white text-2xl font-bold m-4">Edit Your Review</h2>
              <textarea id="reviewContent" cols="40" rows="5" required v-model="myReview.reviewContent" class = "px-6 py-4 bg-[#3F4152] rounded-lg placeholder:text-[#9C9C9C] text-light-grey w-full" placeholder="Your review goes here..."></textarea>
              <div class="flex justify-end mt-4 gap-4">
                <button class="bg-purple-600 hover:bg-purple-800 rounded px-4 py-2 mr-2 text-white" @click="closeDialogEditReview()">Edit</button>
              </div>
            </div>
          </div>
         
          
        </div>
        <ReviewCard v-if="Object.keys(myReview).length !== 0"
                    :review=myReview.reviewContent
                    :username=myReview.username
                    :my-username=myReview.username
                    :is-upvote="myReview.isUpvote"
                    :is-voted="myReview.isVoted"
                    :upvote="myReview.upvote"
                    :downvote="myReview.downvote"
                    :id="myReview.id"
                    @state-change="handleVoteChange"
        ></ReviewCard>
        <div v-if="Object.keys(myReview).length === 0" class="text-justify">
          You haven't left a review yet.
          <button @click="openDialogPostReview" class="text-indigo font-bold">
            Add yours!
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-10 mt-20 min-w-full max-w-[640px]">
      <div class="text-white lg:text-4xl text-2xl font-bold lg:text-left">Other Reviews</div>
      <!-- review card untuk setiap review -->
      <div v-if="isDataLoaded">
        <div v-for="review in reviews.slice(0, 3)" :key="review.id">
          <ReviewCard :review=review.reviewContent
                      :username=review.username
                      :my-username=currentUser.username
                      :is-upvote=review.isUpvote
                      :is-voted="review.isVoted"
                      :upvote="review.upvote"
                      :downvote="review.downvote"
                      :id="review.id"
                      v-if="review.username != currentUser.username"
                      @state-change="handleVoteChange"
                      class="mb-6"
                      >
          </ReviewCard>
        </div>
      </div>
      <div v-if="reviews.length > 3">
        <router-link :to="'/catalog/review/' + data.id">
          <a class="text-indigo lg:text-3xl md:text-xl text-xl font-bold">See all</a>
        </router-link>
      </div>
      <div v-if="token === ''">
        <p>Please sign in to see reviews</p>
      </div>
      <div v-if="reviews.length === 0 && token !== ''">
        <p>There's no other reviews yet</p>
      </div>
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