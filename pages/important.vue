<template>
  <PageLayout>
    <template #header>
      <div class="mb-6 flex items-center gap-2">
        <Siren/>
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
    <!-- Completed Tasks -->
    <template #completed>
      <TaskList
        :tasks="completedTasks"
        @delete-task="deleteTask"
        @view-task="viewTask"
      />
    </template>
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
import { Siren } from 'lucide-vue-next';
// Access the Pinia store
const taskStore = useTaskStore();

// Computed properties
const importantTasks = computed(() => taskStore.importantTasks);
const selectedTask = computed(() => taskStore.selectedTask);
const completedTasks = computed(() => taskStore.completedTasks);

// Methods
const addTask = (task) => taskStore.addTask(task);
const deleteTask = (id) => taskStore.deleteTask(id);
const viewTask = (task) => taskStore.viewTask(task);
const handleUpdateTask = (updatedTask) => taskStore.updateTask(updatedTask);
</script>
