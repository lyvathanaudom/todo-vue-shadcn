<template>
  <PageLayout>
    <template #header>
      <div class="mb-6 flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <Sun />
          <div class="font-semibold text-2xl">My Day</div>
        </div>
        <div class="text-gray-500 text-xs">{{ formattedDate }}</div>
      </div>
    </template>

    <template #content>
      <TaskInput @add-task="addTask" />
      <div class="mt-4">
        <TaskList
          :tasks="todayTasks"
          @delete-task="deleteTask"
          @view-task="viewTask"
        />
      </div>
    </template>

    <!-- Completed Tasks -->
    <template #completed>
      <div class="mt-6">
        <div class="font-semibold">Completed Tasks</div>
        <TaskList
          :tasks="completedTasks"
          @delete-task="deleteTask"
          @view-task="viewTask"
          @mark-complete="markComplete"
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
import { Sun } from 'lucide-vue-next';
import { useTaskStore } from '@/stores/taskStore';

// Access the Pinia store
const taskStore = useTaskStore();

// Computed properties
const todayTasks = computed(() => taskStore.todayTasks);
const selectedTask = computed(() => taskStore.selectedTask);
// const tasks = computed(() => taskStore.tasks);
const completedTasks = computed(() => todayTasks.value.filter((task) => task.completed));

// Methods
const addTask = (task) => taskStore.addTask(task);
const deleteTask = (id) => taskStore.deleteTask(id);
const viewTask = (task) => {
   taskStore.viewTask(task);
   console.log(task.title)
} 
const markComplete = (taskId: string) => {
  console.log("Mark complete event received:", taskId);
  taskStore.markComplete(taskId);
};


// console.log(completedTasks)
// Format current date
const formattedDate = computed(() =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    year: 'numeric',
  })
);
</script>