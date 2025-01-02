<script setup lang="ts">
await navigateTo('/myday')
// Create a reactive reference for the current date
// const currentDate = ref(new Date());

// // Manually format the current date to a string like "Sunday, December, 2024"
// const formattedDate = ref(
//   `${currentDate.value.toLocaleDateString("en-US", { weekday: "long" })}, ` +
//     `${currentDate.value.toLocaleDateString("en-US", { month: "long" })}, ` +
//     `${currentDate.value.getFullYear()}`
// );

// Log the formatted date to the console
</script>

<template>
    <div class="h-[40vh] flex justify-center items-center">
      <div class="mb-2 font-bold text-xl">Main Page</div>
    </div>

</template>
