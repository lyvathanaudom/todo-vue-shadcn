import { defineStore } from "pinia";
import {
  type DateValue,
  getLocalTimeZone,
  isToday,
  today,
} from "@internationalized/date";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [] as Array<{
      id: string;
      title: string;
      note: string;
      date: string;
      important: boolean;
      completed: boolean;
    }>,
    selectedTask: null as null | {
      id: string;
      title: string;
      note: string;
      date: string;
      important: boolean;
      completed: boolean;
    },
  }),
  getters: {
    todayTasks: (state) => {
      const todayDate = today(getLocalTimeZone()).toString();
      return state.tasks.filter(
        (task) => task.date === todayDate && !task.completed
      );
    },
    importantTasks: (state) => {
      return state.tasks.filter((task) => task.important && !task.completed);
    },
    completedTasks: (state) => state.tasks.filter((task) => task.completed),
  },
  actions: {
    addTask(task: {
      title: string;
      note: string;
      date: string;
      important: boolean;
      completed: boolean;
    }) {
      const id = Math.random().toString(36).substr(2, 9); // Generate a unique ID
      this.tasks.push({ ...task, id });
      const today = new Date().toISOString().split("T")[0];
      console.log(today);
    },
    deleteTask(taskId: string) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      if (this.selectedTask?.id === taskId) this.selectedTask = null;
    },
    updateTask(updatedTask) {
      const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = { ...this.tasks[index], ...updatedTask }; // Merge updates
        this.tasks = [...this.tasks];
      }
    },
    viewTask(task) {
      this.selectedTask = task;
    },

  },
});