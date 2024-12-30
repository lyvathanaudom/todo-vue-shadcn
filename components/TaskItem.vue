<script setup lang="ts">
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete-task", "view-task", "mark-complete"]);
const viewTask = () => {
  emit("view-task", props.task);
};
const markComplete = () => {
  emit("mark-complete", props.task.id);
};


</script>

<template>
  <div class="flex items-center gap-4 px-4 py-2 bg-gray-100 rounded-md hover:shadow-sm transition cursor-pointer">
    <Checkbox update:checked="task.completed" @change="markComplete" />
    <div class="flex flex-col flex-1">
      <span
        class="text-base font-medium text-gray-800 hover:underline"
        @click="viewTask"
      >
        {{ task.title }}
      </span>
      <div class="text-xs text-gray-500">
        Due: {{ task.date }} | {{ task.important ? "Important" : "Not Important" }}
      </div>
    </div>
    <!-- <Button @click="$emit('delete-task', task.id)">Remove</Button> -->
  </div>
</template>
