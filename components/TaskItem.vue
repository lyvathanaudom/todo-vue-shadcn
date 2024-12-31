<script setup lang="ts">
import { Checkbox } from "@/components/ui/checkbox";
import { type DateValue, getLocalTimeZone, isToday, today } from "@internationalized/date";

// import { Button } from "@/components/ui/button";
import { Calendar, Trash  } from "lucide-vue-next";
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete-task", "view-task"]);
const viewTask = () => {
  emit("view-task", props.task);
};
const todayDate = today(getLocalTimeZone()).toString();

</script>

<template>
  <Transition name="fade">

    <div
      @click="viewTask"
      :class="{ 'opacity-[70%]': task.completed }"
      class=" flex justify-between  items-center py-2  px-4 bg-gray-100 rounded-md hover:shadow-sm transition cursor-pointer"
    >
    <div class="flex items-center gap-4">

      <Checkbox v-model:checked="task.completed" />
      <div class="flex flex-col">
        <div
          :class="{ 'line-through': task.completed }"
          class="font-medium text-gray-800 hover:underline"
        >
          {{ task.title }}
        </div>
        <div class="text-[10px] flex gap-2 items-center">
          <div class="flex gap-1 items-center">
            <Calendar class="w-3" />
            <span v-if="task.date">{{ task.date === todayDate ? 'Today' : task.date }}</span>
            <span v-else>No date</span>
          </div>
          <span
            :class="
              task.important ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'
            "
            class="px-2 py-1 rounded-2xl"
          >
            {{ task.important ? "Important" : "Not Important" }}
          </span>
        </div>
      </div>
    </div>

      <Button class="bg-red-600" @click="$emit('delete-task', task.id)">
        <Trash/>
      </Button>
    </div>
  </Transition>
</template>
