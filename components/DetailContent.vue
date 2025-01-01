<template>
  <div class="p-4 bg-white border-[1.3px] border-solid border-gray-200 rounded-lg ml-4 min-h-[80vh]">
    <!-- Edit Mode -->
    <template v-if="editing">
      <form @submit.prevent="updateTask">
        <Input
          v-model="editedTask.title"
          placeholder="Title"
          class="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 mb-2"
        />
        <div>
          <textarea
            v-model="editedTask.note"
            placeholder="Note"
            class="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:border-blue-500"
          ></textarea>

          
        </div>
        <div class="flex flex-col gap-2">

          <CalendarPicker v-model="editedTask.date" />
          <div class="flex items-center gap-2 p-2 border-[1.3px] border-solid border-gray-200  rounded-lg">
            <Checkbox v-model:checked="editedTask.important" id="important" />
            <span class="text-xs">Mark as important</span>
            <span
              class="inline-block  rounded-full text-xs px-2 py-1"
              :class="editedTask.important ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
            >
              {{ editedTask.important ? "Important" : "Not Important" }}
            </span>
          </div>
        </div>
        <div class="mt-2 flex">
          <Button class="flex-1" type="submit">Save</Button>
          <Button class="ml-2 bg-gray-300 flex-1" @click="editing = false">Cancel</Button>
        </div>
      </form>
    </template>
    <!-- View Mode -->
    <template v-else>
      <h2 class="text-2xl font-semibold mb-2">{{ editedTask.title }}</h2>
      <p v-if="editedTask.note" class="text-gray-600 mb-2">{{ editedTask.note }}</p>
      <p v-if="formattedDate" class="text-gray-500 text-sm mb-2">Due Date: {{ formattedDate }}</p>

      <div
        class="inline-block px-2 py-1 rounded-full text-xs"
        :class="editedTask.important ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
      >
        {{ editedTask.important ? "Important" : "Not Important" }}
      </div>
      <div>
        <Button class="mt-2" @click="editing = true">Edit</Button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { DateFormatter, parseDate, getLocalTimeZone } from "@internationalized/date";

// Define props
const props = defineProps<{
  id: string;
  title: string;
  note: string;
  date: string;
  important: boolean;
}>();

// Reactive state for editing
const editing = ref(false);
const editedTask = ref({
  title: props.title,
  note: props.note,
  date: parseDate("2025-01-10"), // Set to January 10, 2025
  important: props.important,
});

// Watch for changes in props and update the editedTask state
watch(
  () => [props.title, props.note, props.date, props.important],
  ([newTitle, newNote, newDate, newImportant]) => {
    editedTask.value.title = newTitle;
    editedTask.value.note = newNote;
    editedTask.value.date = parseDate(newDate); // Convert string to DateValue
    editedTask.value.important = newImportant;
  }
);

// Emit event to update task
const emit = defineEmits(["update-task"]);
const updateTask = () => {
  emit("update-task", {
    id: props.id,
    title: editedTask.value.title,
    note: editedTask.value.note,
    date: editedTask.value.date.toString(), // Convert DateValue to string
    important: editedTask.value.important,
  });
  editing.value = false;
};

// Format the date for display
const df = new DateFormatter("en-US", {
  dateStyle: "long",
});
const formattedDate = computed(() => {
  if (!editedTask.value.date) return "";
  return df.format(editedTask.value.date.toDate(getLocalTimeZone()));
});

// Log the formatted date whenever it changes
watch(() => editedTask.value.date, (newDate) => {
  if (newDate) {
    console.log(df.format(newDate.toDate(getLocalTimeZone())));
  } else {
    console.log("No date selected");
  }
});
</script>