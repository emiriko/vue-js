<script lang="ts">
import {defineComponent, ref} from "vue";
import ReviewCard from "@/components/common/ReviewCard.vue";
import VoteButton from "@/components/common/VoteButton.vue";
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

interface Progress {
  seriesId: number;
  episodeOrChapter: number;
  seasonOrVolume: number;
  status: string;
}

export default defineComponent({
  name: "ProgressView",
  methods: {
    capitalized(str: string) {
      const allLowerCase = str.toLowerCase();
      const capitalizedFirst = allLowerCase[0].toUpperCase();
      const rest = allLowerCase.slice(1);

      return capitalizedFirst+rest;
    }
  },
  
  setup() {
    const toast = useToast();

    const showSuccessToast = (message: string) => {
      toast.success(message);
    };

    const splittedURL = window.location.pathname.split('/');
    const baseReviewUrl = "http://localhost:8081/api/review";
    const baseVoteUrl = "http://localhost:8081/api/vote";
    const baseProgressUrl = "http://localhost:8081/api/progress";
    const seriesId = splittedURL[splittedURL.length - 1];
    const baseCatalogUrl = "http://localhost:8082/api/catalog";

    const showErrorToast = (message: string) => {
      toast.error(message);
    };
      return {
      showSuccessToast,
      showErrorToast,
      baseReviewUrl,
      baseVoteUrl,
      seriesId,
      baseCatalogUrl,
      baseProgressUrl
    };

  },

  data() {
    return {
      data: {} as Series,
      progress: [] as Progress[],
      isDataLoaded: false,
      token: "",
      myUsername: ""
    }
  },

  mounted() {
    setTimeout(() => {
      this.isDataLoaded = true;
    }, 2000);

    this.token = Cookies.get('token') || "";
    console.log(this.token);

    // Check progress
    axios.get(`${this.baseProgressUrl}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
        .then((response) => {
          console.log(response.data);
          this.progress = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

    // PSUING
    // for (progress in this.progress):
    //     console.log(this.progress.)

    axios
      .get(`${this.baseCatalogUrl}/${this.$route.params.id}`)
      .then(response => (this.data = response.data))

    // for f in this.progress:
    //   this.showSuccessToast(f)
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
        <div class="series-title">{{ data.title }} ({{ data.year }})</div>
        <div class="series-detail">
          <div class="set">
            <label>Genre: </label>
            <span v-for="genre in data.genres">{{ capitalized(genre)+ " " }} </span>
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