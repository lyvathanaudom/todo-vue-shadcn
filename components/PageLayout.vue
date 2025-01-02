<script setup lang="ts">
// Access the Pinia store
const taskStore = useTaskStore();
const completedTasks = computed(() => taskStore.completedTasks);
const clearAllTasks = () => taskStore.clearAllTasks();
const tasks = computed(() => taskStore.tasks);

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

      <section class="mb-4">
        <div v-show="completedTasks.length > 0" class="mb-4 mt-6">
          <span class="font-semibold">Completed Tasks</span>
          <span class="text-sm ml-2">{{ completedTasks.length }}</span>
        </div>
        <slot name="completed" />
      </section>
      <Button class="text-xs" v-show="tasks.length > 0" @click="clearAllTasks"> Clear All </Button>
    </section>

    <section class="w-2/5">
      <slot name="detail" />
    </section>
  </div>
</template>
