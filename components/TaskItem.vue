<script setup lang="ts">
import { Checkbox } from "@/components/ui/checkbox";
import {
  type DateValue,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { Calendar, X } from "lucide-vue-next";

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

// Get today's date
const todayDate = today(getLocalTimeZone()).toString();

// Calculate tomorrow's date
const tomorrowDate = today(getLocalTimeZone()).add({ days: 1 }).toString();

// Calculate the date one week from today
const nextWeekDate = today(getLocalTimeZone()).add({ days: 6 }).toString();
console.log("Today's Date:", todayDate);
console.log("Tomorrow's Date:", tomorrowDate);
console.log("Next Week's Date:", nextWeekDate);

// Check if the task is overdue
const isOverdue = (taskDate: string | null | undefined) => {
  if (!taskDate) return false;
  const taskDateObj = new Date(taskDate);
  const todayDateObj = new Date(todayDate);
  console.log("Task Date:", taskDate);
  console.log("Today's Date (inside function):", todayDate);
  return taskDateObj < todayDateObj && !props.task.completed;
};

// Check if the task is more than a week away or has no date
const isMoreThanAWeekAwayOrNoDate = (taskDate: string | null | undefined) => {
  if (!taskDate) return true;
  const taskDateObj = new Date(taskDate);
  const nextWeekDateObj = new Date(nextWeekDate);
  return taskDateObj > nextWeekDateObj;
};

// Check if the task is within a week
const isWithinAWeek = (taskDate: string | null | undefined) => {
  if (!taskDate) return false;
  const taskDateObj = new Date(taskDate);
  const todayDateObj = new Date(todayDate);
  const nextWeekDateObj = new Date(nextWeekDate);
  return taskDateObj > todayDateObj && taskDateObj <= nextWeekDateObj;
};
</script>
<template>
  <Transition name="fade">
    <div
      @click="viewTask"
      :class="[
        { 'opacity-[70%]': task.completed },
        { 'border-2 border-blue-300 border-solid': task.date === todayDate },
        { 'border-2 border-red-500 border-solid': isOverdue(task.date) },
        { 'border-2 border-gray-300 border-solid': isWithinAWeek(task.date) },
        { 'border-2 border-green-300 border-solid': isMoreThanAWeekAwayOrNoDate(task.date) }
      ]"
      class="flex justify-between items-center py-2 px-4 bg-gray-100 rounded-md hover:shadow-sm transition cursor-pointer"
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
              <span v-if="task.date">
                {{
                  isOverdue(task.date)
                    ? `Overdue on: ${task.date}`
                    : task.date === todayDate
                    ? "Today"
                    : task.date === tomorrowDate
                    ? "Tomorrow"
                    : task.date
                }}
              </span>
              <span v-else>No deadline</span>
            </div>
            <span
              :class="
                task.important
                  ? 'bg-red-200 text-red-700'
                  : 'bg-green-200 text-green-700'
              "
              class="px-2 py-1 rounded-2xl"
            >
              {{ task.important ? "Important" : "Not Important" }}
            </span>
          </div>
        </div>
      </div>

      <Button class="bg-red-400" @click="$emit('delete-task', task.id)">
        <X />
      </Button>
    </div>
  </Transition>
</template>