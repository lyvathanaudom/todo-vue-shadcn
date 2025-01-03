<script setup lang="ts">
import { useTaskStore } from "@/stores/taskStore";
import { Siren } from "lucide-vue-next";
// Access the Pinia store
const taskStore = useTaskStore();

// Computed properties
const importantTasks = computed(() => taskStore.importantTasks);

// Methods
const addTask = (task: any) => taskStore.addTask(task);
const deleteTask = (id: string) => taskStore.deleteTask(id);
const viewTask = (task: any) => taskStore.viewTask(task);
</script>
<template>
  <div>
    <div class="mb-6 flex items-center gap-2">
      <Siren />
      <div class="font-semibold text-2xl">Important Tasks</div>
    </div>

    <TaskInput @add-task="addTask" />
    <div class="mt-4">
      <div class="mb-4" v-if="importantTasks.length > 0">
        <span class="font-semibold">Important</span>
        <span class="text-sm ml-2">{{ importantTasks.length }}</span>
      </div>
      <div
        v-if="importantTasks.length == 0"
        class="text-center text-gray-600 mt-4"
      >
        <p class="text-sm">There's nothing important.</p>
      </div>
      <TaskList
        :tasks="importantTasks"
        @delete-task="deleteTask"
        @view-task="viewTask"
      />
    </div>
  </div>
</template>
