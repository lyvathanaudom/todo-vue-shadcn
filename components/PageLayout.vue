<script setup lang="ts">
// Access the Pinia store
const taskStore = useTaskStore();
const completedTasks = computed(() => taskStore.completedTasks);
</script>
<template>
  <div class="flex mt-6">
    <section class="flex-1">
      <header>
        <slot name="header" />
      </header>
      <main>
        <slot name="content" />
      </main>

      <section>  
        <div v-show="completedTasks.length > 0"  class="mb-4 mt-6">
          <span class="font-semibold">Completed Tasks</span>
          <span class="text-sm ml-2">{{ completedTasks.length }}</span>
        </div>
        <slot name="completed" />
      </section>

    </section>

    <section class="w-1/2">
      <slot name="detail" />
    </section>
  </div>
</template>
