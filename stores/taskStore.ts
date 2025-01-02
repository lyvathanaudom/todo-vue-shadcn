import { defineStore } from "pinia";
import {
  getLocalTimeZone,
  today,
  // startOfWeek,
  // endOfWeek,
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
    todayDate: today(getLocalTimeZone()).toString(),
  }),
  getters: {
    todayTasks: (state) => {
      return state.tasks.filter(
        (task) => task.date === state.todayDate && !task.completed
      );
    },
    importantTasks: (state) => {
      return state.tasks.filter((task) => task.important && !task.completed);
    },
    completedTasks: (state) => state.tasks.filter((task) => task.completed),
    tomorrowTasks: (state) => {
      const tomorrowDate = new Date(state.todayDate);
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);
      const tomorrowString = tomorrowDate.toISOString().split("T")[0];
      return state.tasks.filter(
        (task) => task.date === tomorrowString && !task.completed
      );
    },
    // weekTasks: (state) => {
    //   const start = startOfWeek(today(getLocalTimeZone())).toString();
    //   const end = endOfWeek(today(getLocalTimeZone())).toString();
    //   return state.tasks.filter(
    //     (task) =>
    //       task.date >= start && task.date <= end && !task.completed
    //   );
    // },
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
    clearAllTasks() {
      this.tasks = [];
      this.selectedTask = null;
    },
  },
});