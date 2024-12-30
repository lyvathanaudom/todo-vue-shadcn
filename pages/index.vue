<script setup lang="ts">
// Create a reactive reference for the current date
const currentDate = ref(new Date());

// Manually format the current date to a string like "Sunday, December, 2024"
const formattedDate = ref(
  `${currentDate.value.toLocaleDateString("en-US", { weekday: "long" })}, ` +
    `${currentDate.value.toLocaleDateString("en-US", { month: "long" })}, ` +
    `${currentDate.value.getFullYear()}`
);

// Log the formatted date to the console
console.log(formattedDate.value);
</script>

<template>
  <div class="app-container">
    <div class="main-content">
      <div class="mb-2 font-bold text-xl">My day</div>
      <!-- Display the formatted date -->
      <div class="text-gray-500 text-xs">{{ formattedDate }}</div>
    </div>
  </div>
</template>
