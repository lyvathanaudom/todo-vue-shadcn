<template>
    <PageLayout>
      <template #header>
        <div class="mb-6 flex flex-col gap-1">
          <div class="font-semibold text-2xl">Important Tasks</div>
        </div>
      </template>
      <template #content>
        <TaskInput @add-task="addTask" />
        <div class="mt-4">
          <TaskList
            :tasks="importantTasks"
            @delete-task="deleteTask"
            @view-task="viewTask"
          />
        </div>
      </template>
  
      <template #detail v-if="selectedTask">
        <DetailContent
          :title="selectedTask.title"
          :date="selectedTask.date"
          :note="selectedTask.note"
          :important="selectedTask.important"
        />
      </template>
    </PageLayout>
  </template>
  
  <script setup lang="ts">
  import { useTaskStore } from '@/stores/taskStore';
  
  // Access the Pinia store
  const taskStore = useTaskStore();
  
  // Computed properties
  const importantTasks = computed(() => taskStore.importantTasks);
  const selectedTask = computed(() => taskStore.selectedTask);
  
  // Methods
  const addTask = (task) => taskStore.addTask(task);
  const deleteTask = (id) => taskStore.deleteTask(id);
  const viewTask = (task) => taskStore.viewTask(task);
//   const markComplete = (id) => taskStore.markComplete(id);
  </script>
  