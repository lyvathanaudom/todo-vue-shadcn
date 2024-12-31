<template>
  <div
    class="p-4 bg-white border-[1.3px] border-solid border-gray-200 rounded-lg ml-4 min-h-[80vh]"
  >
    <!-- Edit Mode -->
    <template v-if="editing">
      <form @submit.prevent="updateTask">
        <input
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
          <input
            type="date"
            v-model="editedTask.date"
            class="border border-gray-300 rounded-md p-1 focus:outline-none focus:border-blue-500 mb-2"
          />
        </div>
        <div
          class="flex items-center gap-2 p-2 border-[1.3px] border-solid border-gray-200 rounded-lg"
        >
          <Checkbox v-model:checked="editedTask.important" id="important" />
          <span>Mark as important</span>
          <span
            class="inline-block px-2 py-1 rounded-full text-xs"
            :class="
              editedTask.important
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
            "
          >
            {{ editedTask.important ? "Important" : "Not Important" }}
          </span>
        </div>
        <div class="mt-2">
          <Button type="submit">Save</Button>
          <Button class="ml-2 bg-gray-300" @click="editing = false"
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

<script setup lang="ts">
import { ref, computed, watch } from "vue";

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
  date: props.date,
  important: props.important,
});

// Watch for changes in props and update the editedTask state
watch(
  () => [props.title, props.note, props.date, props.important],
  ([newTitle, newNote, newDate, newImportant]) => {
    editedTask.value.title = newTitle;
    editedTask.value.note = newNote;
    editedTask.value.date = newDate;
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
    date: editedTask.value.date,
    important: editedTask.value.important,
  });
  editing.value = false;
};

// Format the date for display
const formattedDate = computed(() => {
  if (!editedTask.value.date) return "";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(editedTask.value.date).toLocaleDateString(undefined, options);
});
</script>
