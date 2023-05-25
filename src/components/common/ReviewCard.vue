<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'ReviewCard',
  props: {
    id: {
      required: true,
      type: Number
    },
    username: {
      required: true,
      type: String
    },
    myUsername: {
      required: true,
      type: String
    },
    review: {
      required: true,
      type: String
    },
    isUpvote: {
      required: true,
      type: Boolean
    },
    isVoted: {
      required: true,
      type: Boolean
    },
    upvote: {
      required: true,
      type: Number
    },
    downvote: {
      required: true,
      type: Number
    },
  },
  methods: {
    limitText(value: String): String{
      if (value.length > 120) {
        return value.slice(0, 120)
      } return value
    },
    handleVoteClick(type: String) {
      if (this.username != this.myUsername) {
        this.$emit('state-change', type, this.id);
      }
    }
  }
})

</script>

<template>
  <div class="relative flex items-center h-[180px] w-full lg:w-[640px]">
    <!-- profile pic -->
    <img class="absolute z-10 inset-y-0 left-0 my-auto h-3/5" src="@/assets/profile_pic.png"/>
    <!-- review card -->
    <div class = "absolute z-0 inset-y-0 right-0 flex flex-col bg-grey
              h-[180px] w-11/12 lg:w-[593px] rounded-xl grid grid-cols-1 gap-2 content-center py-5 px-20 mx-0">
      <h1 class = "text-2xl font-bold text-white w-full text-justify"> {{ username }}</h1>
      <div class="whitespace-break-words text-left">{{ limitText(review) }}</div>
      <div class="items-end flex justify-end gap-4">
        <div class="flex gap-2">
          <div @click="handleVoteClick('upvote')">
            <img v-if="isUpvote" class="w-[20px]" src='@/assets/icons/upvote-notclicked.svg'/>
            <img v-else class="w-[20px]" src='@/assets/icons/upvote-clicked.svg'/>
          </div>
          <p class="text-white">{{ upvote }}</p>
        </div>
        <div class="flex gap-2">
          <div @click="handleVoteClick('downvote')">
            <img v-if="!isUpvote&&isVoted" class="w-[20px]" src='@/assets/icons/downvote-notclicked.svg'/>
            <img v-else class="w-[20px]" src='@/assets/icons/downvote-clicked.svg'/>
          </div>
          <p class="text-white">{{ downvote }}</p>
        </div>
      </div>
    </div>
  </div>
</template>