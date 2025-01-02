<template>
  <div>
    <TransitionGroup class="flex flex-col gap-2" name="list" tag="TaskItem">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @delete-task="$emit('delete-task', task.id)"
        @view-task="$emit('view-task', task)"
      >
      </TaskItem>
    </TransitionGroup>
  </div>
</template>

<script setup>
const props = defineProps({
  tasks: Array,
});

const emit = defineEmits(["delete-task", "view-task"]);
</script>
