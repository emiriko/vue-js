<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  name: 'Button',
  components: {
    RouterLink
  },
  props: {
    onClick: {
      type: Function,
      required: false,
      default: () => {}
    },
    type: {
      required: true,
      type: String,
      validator: function (value: string) {
        if (['white', 'indigo'].includes(value)) {
          return true
        } else {
          throw new Error('The color prop must be either "white" or "indigo"')
        }
      }
    },
    className: {
      type: String,
      required: false,
      default: ""
    },
  }
})
</script>

<template>
  <button class = "px-8 py-2 text-center rounded-xl font-bold" :class="[type === 'white' ? '' : 'bg-indigo text-white', className]" type="submit">
    <slot> Button Here (type harus "white" atau "indigo") </slot>
  </button>
</template>
