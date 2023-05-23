<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";

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
    seasonsOrVolume: number;
    status: string;
}

export default defineComponent({
  name: "ProgressView",
  components: {
  }, methods: {
    capitalized(str: String) {
      const allLowerCase = str.toLowerCase();
      const capitalizedFirst = allLowerCase[0].toUpperCase();
      const rest = allLowerCase.slice(1);

      return capitalizedFirst+rest;
    },
  },

  data() {
    return {
      data: [] as Progress[],
      isOpen: false,
    }
  },

  async mounted() {
    await axios
    .get(`${baseProgressUrl}/${seriesId}`, {
    params: {
        username: 'naila'
    }
    }).then(response => (this.data = response.data))

  } 
})


// ---- | ----
const url = window.location.pathname
var splittedURL = url.split('/')
const seriesId = splittedURL[splittedURL.length - 1];

const baseCatalogUrl = "http://localhost:8080/api/catalog";
const baseProgressUrl = "http://localhost:8080/api/progress";

</script>

<template>
<div>
    <div class="series-list">
        <div class="series" v-for="series in data" :key="series.seriesId">
            <router-link :to="{name: 'progress detail', params: {id: series.seriesId}}" class="series-link">
                <div class="series-image">
                    <!-- <img v-bind:src="series.imageUrl" alt="Series Image" class="image"/>
                    <div class="title">{{ series.title }} ({{ series.year }})</div> -->
                </div>
            </router-link>
        </div>
    </div>
    <div class="container" v-for="series in data">
      <div class="poster">
        <!-- <img v-bind:src="data[0].imageUrl" alt="image"/> -->
      </div>
      <div class="info">
        <!-- <div class="series-title">{{ series.title }} ({{ series.year }})</div> -->
        <div class="series-detail">
          <!-- <div class="set">
            <label>Genre: </label>
            <span v-for="genre in series.genres">{{ capitalized(genre)+ " " }} </span>
          </div>
          <div class="set">
            <label>Series ID: </label>
            <span>{{ series.id }}</span>
          </div>
          <div class="set">
            <label>Type: </label>
            <span>{{ series.type }}</span>
          </div>
          <div class="set">
            <label v-if="series.type === `SHOW`">Season(s): {{ series.seasonsOrVolume }}</label>
            <label v-if="series.type === `BOOK`">Volume(s): {{ series.seasonsOrVolume }}</label>
          </div>
          <div class="set">
            <label v-if="series.type === `SHOW`">Episode(s): {{ series.episodeOrChapter }}</label>
            <label v-if="series.type === `BOOK`">Chapter(s): {{ series.episodeOrChapter }}</label>
          </div> -->
        </div>
        <div class="set">
            <label>Progress: </label>
            <span>{{ series.episodeOrChapter }} / {{ series.episodeOrChapter }} episodes </span>
        </div>

        <div class="set">
            <label>Status: </label>
            <span>{{ series.episodeOrChapter }} completed </span>
        </div>        
      </div>
    </div>
</div>
</template>
