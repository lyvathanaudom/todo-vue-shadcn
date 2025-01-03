<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  DateFormatter,
  parseDate,
  getLocalTimeZone,
} from "@internationalized/date";
import { AlertCircle } from "lucide-vue-next";

// Define props
const props = defineProps<{
  id: string;
  title: string;
  note: string;
  date: string | null;
  important: boolean;
}>();

const editing = ref(false);
const editedTask = ref({
  title: props.title,
  note: props.note,
  date: props.date ? parseDate(props.date) : null,
  important: props.important,
});

const titleError = ref("");

// Watch for prop changes
watch(
  () => [props.title, props.note, props.date, props.important],
  ([newTitle, newNote, newDate, newImportant]) => {
    editedTask.value.title = newTitle;
    editedTask.value.note = newNote;
    editedTask.value.date = newDate ? parseDate(newDate) : null;
    editedTask.value.important = newImportant;
  }
);

// Emit event to update task
const emit = defineEmits(["update-task"]);
const updateTask = () => {
  if (!editedTask.value.title.trim()) {
    titleError.value = "Title is required.";
    setTimeout(() => {
      alertError.value = false;
    }, 3000);
    return;
  }
  titleError.value = "";
  emit("update-task", {
    id: props.id,
    title: editedTask.value.title,
    note: editedTask.value.note,
    date: editedTask.value.date ? editedTask.value.date.toString() : null,
    important: editedTask.value.important,
  });
  editing.value = false;
};

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});
const formattedDate = computed(() => {
  if (!editedTask.value.date) return "";
  return df.format(editedTask.value.date.toDate(getLocalTimeZone()));
});
</script>

<template>
  <div class="p-4 bg-white border border-gray-200 rounded-lg">
    <!-- Edit Mode -->
    <template v-if="editing">
      <form @submit.prevent="updateTask">
        <Input
          v-model="editedTask.title"
          placeholder="Title"
          class="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 mb-2"
        />
        <Transition name="fade">
          <Alert v-show="titleError" variant="destructive" class="mb-2">
            <AlertCircle class="w-4 h-4" />
            <AlertTitle>Failed</AlertTitle>
            <AlertDescription> Please input your task</AlertDescription>
          </Alert>
        </Transition>
        <div>
          <textarea
            v-model="editedTask.note"
            placeholder="Note"
            class="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div class="flex flex-col gap-2">
          <CalendarPicker v-model="editedTask.date" />
          <div
            class="flex items-center gap-2 p-2 border border-gray-200 rounded-lg"
          >
            <Checkbox v-model:checked="editedTask.important" id="important" />
            <span class="text-xs">Mark as important</span>
            <span
              class="inline-block rounded-full text-xs px-2 py-1"
              :class="
                editedTask.important
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
              "
            >
              {{ editedTask.important ? "Important" : "Not Important" }}
            </span>
          </div>
        </div>
        <div class="mt-2 flex">
          <Button class="flex-1" type="submit">Save</Button>
          <Button class="ml-2 bg-gray-300 flex-1" @click="editing = false"
            >Cancel</Button
          >
        </div>
      </form>
    </template>
    <!-- View Mode -->
    <template v-else>
      <h2 class="text-2xl font-semibold mb-2">{{ editedTask.title }}</h2>
      <p v-if="editedTask.note" class="text-gray-600 mb-2">
        {{ editedTask.note }}
      </p>
      <p v-if="formattedDate" class="text-gray-500 text-sm mb-2">
        Due Date: {{ formattedDate }}
      </p>
      <div
        class="inline-block px-2 py-1 rounded-full text-xs"
        :class="
          editedTask.important
            ? 'bg-red-100 text-red-800'
            : 'bg-green-100 text-green-800'
        "
      >
        {{ editedTask.important ? "Important" : "Not Important" }}
      </div>
      <div>
        <Button class="mt-2" @click="editing = true">Edit</Button>
      </div>
    </template>
  </div>
</template>
