<script setup lang="ts">
import { useTaskStore } from "@/stores/taskStore";
import { ClipboardList } from "lucide-vue-next";
const taskStore = useTaskStore();
// Computed properties
const tasks = computed(() => {
  return taskStore.tasks.filter((task) => !task.completed);
});
const completedTasks = computed(() => taskStore.completedTasks);
// Task store
// Methods
const addTask = (task) => {
  console.log("Adding task:", task);
  taskStore.addTask(task);
};
const deleteTask = (id) => {
  console.log("Deleting task with ID:", id);
  taskStore.deleteTask(id);
};

const viewTask = (task) => {
  taskStore.viewTask(task);
  console.log("Viewing task:", task.title);
};
</script>
<template>
  <div>
    <div class="mb-6 flex items-center gap-2">
      <ClipboardList />
      <div class="font-semibold text-2xl">All tasks</div>
    </div>
    <TaskInput @add-task="addTask" />
    <div class="mt-4">
      <div class="mb-4" v-if="tasks.length > 0">
        <span class="font-semibold">Tasks</span>
        <span class="text-sm ml-2">{{ tasks.length }}</span>
      </div>
      <div v-if="tasks.length == 0" class="text-center text-gray-600 mt-4">
        <p class="text-sm">There's no task. Take a deep breath.</p>
      </div>
      <TaskList
        :tasks="tasks"
        @delete-task="deleteTask"
        @view-task="viewTask"
      />
    </div>
    <TaskList
      :tasks="completedTasks"
      @delete-task="deleteTask"
      @view-task="viewTask"
    />
  </div>
</template>
