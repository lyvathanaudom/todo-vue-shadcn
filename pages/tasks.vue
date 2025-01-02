<template>
  <PageLayout>
    <template #header>
      <div class="mb-6 flex items-center gap-2">
        <ClipboardList />
        <div class="font-semibold text-2xl">All tasks</div>
      </div>
    </template>
    <template #content>
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
    </template>

    <!-- Completed Tasks -->
    <template #completed>
      <TaskList
        :tasks="completedTasks"
        @delete-task="deleteTask"
        @view-task="viewTask"
      />
    </template>

    <!-- Task Details -->
    <template #detail v-if="selectedTask">
      <DetailContent
        :id="selectedTask.id"
        :title="selectedTask.title"
        :date="selectedTask.date"
        :note="selectedTask.note"
        :important="selectedTask.important"
        @update-task="handleUpdateTask"
      />
    </template>
  </PageLayout>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/taskStore";
import { ClipboardList } from "lucide-vue-next";
const taskStore = useTaskStore();
// Computed properties
const tasks = computed(() => {
  return taskStore.tasks.filter((task) => !task.completed);
});
const selectedTask = computed(() => taskStore.selectedTask);
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
const handleUpdateTask = (updatedTask) => taskStore.updateTask(updatedTask);

const viewTask = (task) => {
  taskStore.viewTask(task);
  console.log("Viewing task:", task.title);
};
</script>
