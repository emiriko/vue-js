<script lang="ts">
import {defineComponent} from "vue";
import {integer} from "vue-types";

export default defineComponent({
  name: 'VoteButton',
  props: {
    type: {
      required: true,
      type: String
    },
    isClicked: {
      required: true,
      type: Boolean
    },
    count: {
      required: true,
      type: integer
    }
  },
  methods: {
    voteLogo(): String {
      if (this.isClicked) {
        if (this.type === "upvote") {
          return "upvote-clicked"
        } return "downvote-clicked"
      } else if(this.type === "upvote") {
        return "upvote-notclicked"
      } return "downvote-notclicked"
    },
    bgClicked(): String {
      if(this.isClicked) {
        return "#5228EE"
      } return "#323443"
    }
  }
})
</script>

<template>
  <div class="flex flex-col justify center items-center rounded-xl py-7 px-12 text-center" :class="isClicked? 'bg-[#5228EE]':'bg-[#323443]'">
    <!-- Logo -->
    <div class="items-center">
      <img v-if="isClicked && type === 'upvote'" src='@/assets/icons/upvote-clicked.svg'/>
      <img v-if="isClicked && type === 'downvote'" src='@/assets/icons/downvote-clicked.svg'/>
      <img v-if="!isClicked && type === 'upvote'" src='@/assets/icons/upvote-notclicked.svg'/>
      <img v-if="!isClicked && type === 'downvote'" src='@/assets/icons/downvote-notclicked.svg'/>
    </div>
    <!-- Count -->
    <p class="text-xl font-bold text-white w-full mt-5">{{count}}</p>
    <!-- upvotes/downvotes -->
    <p v-if="type === 'upvote'">upvotes</p>
    <p v-else>downvotes</p>
  </div>
</template>