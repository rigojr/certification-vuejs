<script setup>
import { StarIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  'isDisabled': Boolean,
  'isClickable': Boolean
});

</script>

<template>
  <button
    :disabled="!isClickable"
    :class="{ 'cursor-not-allowed': !isClickable }"
  >
    <StarIcon
      class="h-5 text-yellow-300"
      :class="{ 'text-gray-300': props.isDisabled }"
    />
  </button>
</template>