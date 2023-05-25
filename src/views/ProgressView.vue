<script lang="ts">
import {defineComponent, ref} from "vue";
import axios from "axios";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import Cookies from 'js-cookie';

interface ProgressSeries {
  title: string;
  id: number;
  year: number;
  genres: string[];
  imageUrl: string;
  type: string;
  volumes: number;
  chapters: number;
  seasons: number;
  episodes: number;
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
    },
    toDetail(seriesId: number) {
      this.$router.push('/progress/' + seriesId);
    }
  },
  
  setup() {
    const toast = useToast();

    const showSuccessToast = (message: string) => {
      toast.success(message);
    };

    const splittedURL = window.location.pathname.split('/');
    const seriesId = splittedURL[splittedURL.length - 1];
    const baseProgressUrl = "http://34.143.188.191/api/progress";
    const baseCatalogUrl = "http://localhost:8082/api/catalog";

    const showErrorToast = (message: string) => {
      toast.error(message);
    };
      return {
      showSuccessToast,
      showErrorToast,
      seriesId,
      baseCatalogUrl,
      baseProgressUrl
    };

  },

  data() {
    return {
      data: [] as ProgressSeries[],
      isDataLoaded: false,
      token: "",
      myUsername: ""
    }
  },

  async mounted() {
    setTimeout(() => {
      this.isDataLoaded = true;
    }, 2000);

    this.token = Cookies.get('token') || "";
    console.log(this.token);

    // get progress
    await axios.get(`${this.baseProgressUrl}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
        .then((response) => {
          console.log(response.data);
          this.data = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

    // PSUING
    // for (progress in this.progress):
    //     console.log(this.progress.)

    this.data.forEach( a => {
      axios
      .get(`${this.baseCatalogUrl}/${a.seriesId}`)
      .then((response) => {
          console.log(response.data);
          a.title = response.data.title
          a.year = response.data.year
          a.imageUrl = response.data.imageUrl
          a.genres = response.data.genres
          a.type = response.data.type
          a.seasons = response.data.seasons
          a.volumes = response.data.volumes
          a.episodes = response.data.episodes
          a.chapters = response.data.chapters
        })
    })
    // for f in this.progress:
    //   this.showSuccessToast(f)
  }
})

</script>

<template>

  <div v-for="item in data">
    <div class="container mb-5 gap-5" @click="toDetail(item.seriesId)">
      <div class="poster">
        <img v-bind:src="item.imageUrl" alt="image"/>
      </div>
      <div class="info">
        <div class="series-title">{{ item.title }} ({{ item.year }})</div>
        <div class="series-detail">
          <div class="set">
            <label>Genre: </label>
            <span v-for="genre in item.genres">{{ capitalized(genre)+ " " }} </span>
          </div>
          <div class="set">
            <label>Series ID: </label>
            <span>{{ item.seriesId }}</span>
          </div>
          <div class="set">
            <label>Type: </label>
            <span>{{ item.type }}</span>
          </div>
          <div class="set">
            <label v-if="item.type === `SHOW`">Season(s): {{ item.seasons }}</label>
            <label v-if="item.type === `BOOK`">Volume(s): {{ item.volumes }}</label>
          </div>
          <div class="set">
            <label v-if="item.type === `SHOW`">Episode(s): {{ item.episodes }}</label>
            <label v-if="item.type === `BOOK`">Chapter(s): {{ item.chapters }}</label>
          </div>
          <div class="set" v-if="item.type === `SHOW`">
          <label>Progress: </label>
          <br>
          <span>{{ item.seasonOrVolume }} / {{ item.seasons }} season(s)</span>
          <br>
          <span>{{ item.episodeOrChapter }} / {{ item.episodes }} episode(s)</span>
        </div>

        <div class="set" v-if="item.type === `BOOK`">
          <label>Progress: </label>
          <br>
          <span>{{ item.seasonOrVolume }} / {{ item.volumes }} volume(s)</span>
          <br>
          <span>{{ item.episodeOrChapter }} / {{ item.chapters }} chapter(s)</span>
        </div>

        <div class="set">
          <label>Status: </label>
          <span>{{ item.status }} </span>
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
  margin-bottom: 5%;
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