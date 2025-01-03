<template>
  <div class="flex gap-10 p-10">
    <aside class="w-96">
      <SideBar />
    </aside>
    <main class="w-2/5">
      <slot />
    </main>
    <Transition name="fade-size" mode="out-in">
      <DetailTask
        v-if="selectedTask"
        class="flex-1"
        :id="selectedTask?.id"
        :title="selectedTask?.title"
        :date="selectedTask?.date"
        :note="selectedTask?.note"
        :important="selectedTask?.important"
        @update-task="handleUpdateTask"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTaskStore } from "@/stores/taskStore";

// Access the Pinia store
const taskStore = useTaskStore();

// Computed properties
const selectedTask = computed(() => taskStore.selectedTask);

// Methods
const handleUpdateTask = (updatedTask: any) =>
  taskStore.updateTask(updatedTask);
</script>