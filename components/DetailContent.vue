<template>
  <div class="p-4 min-h-full  bg-white">
    <h2 class="text-2xl font-semibold mb-2">{{ title }}</h2>
    <p class="text-gray-600 mb-2" v-if="note !== ''">{{ note }}</p>
    <p v-if="date !== ''" class="text-gray-500 mb-2"  >Due Date: {{ formattedDate }}</p>
    <p class="text-sm">
      <span
        class="inline-block px-2 py-1 rounded-full text-xs"
        :class="important ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
      >
        {{ important ? 'Important' : 'Not Important' }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Define props
const props = defineProps<{
  title: string;
  note: string;
  date: string;
  important: boolean;
}>();

// Format the date for display
const formattedDate = computed(() => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(props.date).toLocaleDateString(undefined, options);
});
</script>
