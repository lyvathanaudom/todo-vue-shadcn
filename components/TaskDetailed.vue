<script setup>
import { ref } from "vue";
//   import CalendarPicker from './CalendarPicker.vue';

const props = defineProps({
  task: Object,
});

const newStep = ref("");

const addStep = () => {
  if (newStep.value.trim()) {
    task.steps.push({ text: newStep.value, completed: false });
    newStep.value = "";
  }
};

const setDate = (selectedDate) => {
  task.date = selectedDate;
};

const emit = defineEmits(["save-task"]);

const saveTask = () => {
  emit("save-task", task);
};
</script>
<template>
  <div>
    <h2>{{ task.title }}</h2>
    <textarea v-model="task.notes" placeholder="Add notes"></textarea>
    <div>
      <h3>Steps</h3>
      <ul>
        <li v-for="(step, index) in task.steps" :key="index">
          <input type="checkbox" v-model="step.completed" />
          <span>{{ step.text }}</span>
        </li>
      </ul>
      <input v-model="newStep" placeholder="Add a step" />
      <button @click="addStep">Add Step</button>
    </div>
    <CalendarPicker @set-date="setDate" />
    <button @click="saveTask">Save</button>
  </div>
</template>
