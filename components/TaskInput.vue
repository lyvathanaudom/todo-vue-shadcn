<template>
  <form class="flex flex-col gap-2" @submit.prevent="addTask">
    <!-- Task Title Input -->
    <Input
      v-model="title"
      @focus="showNote = true"
      placeholder="Add a new task"
      class="w-full"
    />

    <!-- Note Input -->
    <Input
      v-if="showNote"
      v-model="note"
      class="w-full p-3 border-2 border-solid rounded-md"
      placeholder="Type your note here."
    />

    <!-- Date Picker and Important Checkbox -->
    <div class="flex gap-2 items-center">
      <CalendarPicker v-model="date" />
      <div
        class="flex items-center space-x-2 h-9 px-4 border-solid border-[1.5px] flex-1 rounded-md"
      >
        <Checkbox v-model:checked="important" id="important" />
        <label
          for="important"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Mark as important
        </label>
      </div>
    </div>

    <!-- Submit Button -->
    <Button type="submit">Add Task</Button>
    <Transition name="fade">


    <Alert v-show="alertError" variant="destructive">
      <AlertCircle class="w-4 h-4" />
      <AlertTitle>Failed</AlertTitle>
      <AlertDescription> Please input your task</AlertDescription>
    </Alert>
  </Transition>
  </form>
</template>

<script setup lang="ts">
import { AlertCircle } from "lucide-vue-next";
import {
  type DateValue,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// Reactive state variables
const title = ref("");
const note = ref("");
const showNote = ref(false);
const route = useRoute();
const alertError = ref(false)
// Initialize date and important based on the current route
const date = ref<DateValue | undefined>(
  route.name === "myday" ? today(getLocalTimeZone()) : undefined
);
const important = ref(route.name === "important");

// Define emits
const emit = defineEmits(["add-task"]);

// Function to add a task
const addTask = () => {
  if (!title.value) {
    console.error("Task title is required.");
    alertError.value = true
    setTimeout(() => {
      alertError.value = false;
    }, 3000);
    return;
  }

  const task = {
    id: Date.now(),
    title: title.value,
    note: note.value,
    date: date.value?.toString() || null,
    important: important.value,
    completed: false,
  };

  emit("add-task", task);
  resetForm();
};

// Function to reset the form
const resetForm = () => {
  title.value = "";
  note.value = "";
  // showNote.value = false;
  date.value = route.name === "myday" ? today(getLocalTimeZone()) : undefined;
  important.value = route.name === "important";
};
</script>
