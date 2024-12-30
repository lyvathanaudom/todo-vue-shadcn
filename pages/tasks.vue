<template>
  <PageLayout>
    <template #header>
      <div class="mb-6 flex flex-col gap-1">
        <div class="font-semibold text-2xl">All tasks</div>
      </div>
    </template>

    <!-- Pending Tasks -->
    <template #content>
      <TaskInput @add-task="addTask" />
      <div class="mt-4">
        <TaskList
          :tasks="pendingTasks"
          @delete-task="deleteTask"
          @view-task="viewTask"
          @mark-complete="markComplete"
        />
      </div>
    </template>

    <!-- Completed Tasks -->
    <template #completed>
      <div class="mt-6">
        <h2 class="font-semibold text-xl">Completed Tasks</h2>
        <TaskList
          :tasks="completedTasks"
          @delete-task="deleteTask"
          @view-task="viewTask"
          @mark-complete="markComplete"
        />
      </div>
    </template>

    <!-- Task Details -->
    <template #detail v-if="selectedTask">
      <DetailContent
        :title="selectedTask?.title"
        :date="selectedTask?.date"
        :note="selectedTask?.note"
        :important="selectedTask?.important"
      />
    </template>
  </PageLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

// Task store
const taskStore = useTaskStore();
const { tasks, addTask, deleteTask, viewTask, markComplete } = taskStore;

// Computed properties for filtering tasks
const pendingTasks = computed(() => tasks.filter((task) => !task.completed));
const completedTasks = computed(() => tasks.filter((task) => task.completed));

// Selected task for detail view
const selectedTask = computed(() => taskStore.selectedTask);
</script>
