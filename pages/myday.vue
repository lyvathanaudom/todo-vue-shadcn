<script setup lang="ts">
import { useTaskStore } from "@/stores/taskStore";
import { Sun } from "lucide-vue-next";

// Access the Pinia store
const taskStore = useTaskStore();

// Computed properties
const todayTasks = computed(() => [...taskStore.todayTasks].reverse());
const tomorrowTasks = computed(() => [...taskStore.tomorrowTasks].reverse());
const completedTasks = computed(() => taskStore.completedTasks);

// Methods
const addTask = (task) => taskStore.addTask(task);
const deleteTask = (id) => taskStore.deleteTask(id);
const viewTask = (task) => taskStore.viewTask(task);
const handleUpdateTask = (updatedTask) => taskStore.updateTask(updatedTask);

// Format current date
const formattedDate = computed(() =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    year: "numeric",
  })
);
</script>

<template>
  <div>
    <div class="mb-6 flex flex-col gap-1">
      <div class="flex items-center gap-2">
        <Sun />
        <div class="font-semibold text-2xl">My Day</div>
      </div>
      <div class="text-gray-500 text-xs">{{ formattedDate }}</div>
    </div>
    <!-- Content -->
    <TaskInput @add-task="addTask" />

    <div class="mt-4">
      <div class="mb-4" v-if="todayTasks.length > 0">
        <span class="font-semibold">Today</span>
        <span class="text-sm ml-2">{{ todayTasks.length }}</span>
      </div>
      <div v-else class="text-center text-gray-600 mt-4">
        <p class="text-sm">No tasks for today! Enjoy your free time!</p>
      </div>
      <TaskList
        :tasks="todayTasks"
        @delete-task="deleteTask"
        @view-task="viewTask"
      />
    </div>
    <div class="mt-4">
      <div class="mb-4" v-if="tomorrowTasks.length > 0">
        <span class="font-semibold">Tomorrow</span>
        <span class="text-sm ml-2">{{ tomorrowTasks.length }}</span>
      </div>

      <TaskList
        :tasks="tomorrowTasks"
        @delete-task="deleteTask"
        @view-task="viewTask"
      />
    </div>
  </div>
</template>
