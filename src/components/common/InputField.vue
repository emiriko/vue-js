<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import type { PropType } from 'vue-types/dist/types';

export default defineComponent({
  name: 'Button',
  components: {
    RouterLink
  },
  props: {
    type: {
        required: true,
        type: String,
    },
    className: {
      type: String,
      required: false,
      default: ""
    },
    placeholder: {
        type: String,
        required: false,
        default: ""
    },
    inp: {
      type: String as PropType<string>,
      required: true,
      default: "",
    }
  },
})
</script>

<template>
    <div class="flex items-center gap-x-4 w-full mx-0 relative">
        <input :type = "type" class = "px-6 py-4 bg-[#3F4152] rounded-lg placeholder:text-[#9C9C9C] text-light-grey w-full" :placeholder="placeholder" :value="inp" @input="$emit('update:inp', ($event.target as HTMLInputElement).value)" required/>
        <slot> </slot>
    </div>
</template>
