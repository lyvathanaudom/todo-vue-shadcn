<template>
    <div>
      <div v-if="tasks.length === 0">
        <slot>No tasks available</slot>
      </div>
      <div
      class="flex flex-col gap-2"
       v-else>
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @delete-task="$emit('delete-task', task.id)"
          @view-task="$emit('view-task', task)"
          @mark-complete="$emit('mark-complete', task.id)"
        >
        </TaskItem>
      </div>
    </div>
  </template>
  
  <script setup>
  
  const props = defineProps({
    tasks: Array,
  });
  
  const emit = defineEmits(['delete-task', 'view-task', 'mark-complete']);
  </script>