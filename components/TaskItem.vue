<script setup lang="ts">
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, X } from "lucide-vue-next";
import { ref, computed } from "vue";
import {
  type DateValue,
  getLocalTimeZone,
  today,
} from "@internationalized/date";

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

// Utility function to get dates
const getDate = (daysToAdd = 0) =>
  today(getLocalTimeZone()).add({ days: daysToAdd }).toString();

const todayDate = getDate();
const tomorrowDate = getDate(1);
const nextWeekDate = getDate(6);
const isOverdue = computed(() => {
  if (!props.task.date) return false;
  const taskDateObj = new Date(props.task.date);
  const todayDateObj = new Date(todayDate);
  return taskDateObj < todayDateObj && !props.task.completed;
});

const isMoreThanAWeekAwayOrNoDate = computed(() => {
  if (!props.task.date) return true;
  const taskDateObj = new Date(props.task.date);
  const nextWeekDateObj = new Date(nextWeekDate);
  return taskDateObj > nextWeekDateObj;
});

const isWithinAWeek = computed(() => {
  if (!props.task.date) return false;
  const taskDateObj = new Date(props.task.date);
  const todayDateObj = new Date(todayDate);
  const nextWeekDateObj = new Date(nextWeekDate);
  return taskDateObj > todayDateObj && taskDateObj <= nextWeekDateObj;
});
</script>

<template>
  <Transition name="fade">
    <div
      @click="viewTask"
      :class="[
        { 'opacity-[70%]': task.completed },
        { 'border-2 border-blue-500 border-solid': task.date === todayDate },
        { 'border-2 border-red-600 border-solid': isOverdue },
        { 'border-2 border-amber-400 border-solid': isWithinAWeek },
        {
          'border-2 border-green-400 border-solid': isMoreThanAWeekAwayOrNoDate,
        },
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
                  isOverdue
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
