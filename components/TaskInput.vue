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
  </form>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { type DateValue, getLocalTimeZone, today } from "@internationalized/date";

const route = useRoute(); // Get the current route
const title = ref(""); // Task title input
const note = ref(""); // Note input
const showNote = ref(false); // Controls visibility of the note field

// Default date: "today" if on the MyDay page
const date = ref<DateValue | undefined>(
  route.name === "myday" ? today(getLocalTimeZone()) : undefined
);

// Default important flag: true if on the Important page
const important = ref(route.name === "important");

// Emit the "add-task" event
const emit = defineEmits(["add-task"]);

const addTask = () => {
  if (!title.value) {
    console.error("Task title is required.");
    // Consider showing a user-friendly error message here
    return;
  }

  // Create a new task object
  const task = {
    id: Date.now(), // Unique ID for the task
    title: title.value, // Task title
    note: note.value, // Task note
    date: date.value?.toString() || null, // Task deadline
    important: important.value, // Whether the task is important
  };

  // Emit the task to the parent component
  emit("add-task", task);

  // Reset the form after submission
  resetForm();
};

const resetForm = () => {
  title.value = "";
  note.value = ""; // Reset the note input
  showNote.value = false; // Hide the note field after submission
  date.value = route.name === "myday" ? today(getLocalTimeZone()) : undefined;
  important.value = route.name === "important";
};
</script>