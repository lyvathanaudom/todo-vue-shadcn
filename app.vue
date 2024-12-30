<script setup lang="ts">
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar with flexible width -->
    <aside class="flex-none w-1/5 px-5 py-10">
      <SideBar />
    </aside>
    
    <!-- Main content area that takes the remaining space -->
    <main id="app" class="flex-1 p-6">
      <NuxtPage />
    </main>
  </div>
</template>