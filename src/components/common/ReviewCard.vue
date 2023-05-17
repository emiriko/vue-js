<script lang="ts">
import {defineComponent} from "vue";
export default defineComponent({
  name: 'ReviewCard',
  props: {
    username: {
      required: true,
      type: String
    },
    review: {
      required: true,
      type: String
    }
  },
  methods: {
    limitText(value: String): String{
      if (value.length > 120) {
        return value.slice(0, 120)
      } return value
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
      <div class="whitespace-break-words">{{ limitText(review) }}</div>
    </div>
  </div>
</template>