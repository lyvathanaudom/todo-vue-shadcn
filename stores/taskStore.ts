import { getLocalTimeZone, today } from "@internationalized/date";
import { defineStore } from "pinia";
import type { Task } from "@/interfaces/task"; 

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [] as Task[],
    selectedTask: null as Task | null,
    todayDate: today(getLocalTimeZone()).toString(),
  }),
  getters: {
    todayTasks: (state) =>
      state.tasks.filter(
        (task) => task.date === state.todayDate && !task.completed
      ),
    importantTasks: (state) =>
      state.tasks.filter((task) => task.important && !task.completed),
    completedTasks: (state) => state.tasks.filter((task) => task.completed),
    tomorrowTasks: (state) => {
      const tomorrowDate = new Date(state.todayDate);
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);
      const tomorrowString = tomorrowDate.toISOString().split("T")[0];
      return state.tasks.filter(
        (task) => task.date === tomorrowString && !task.completed
      );
    },
  },
  actions: {
    addTask(task: Task) {
      const id = Math.random().toString(36).substr(2, 9); // Generate a unique ID
      this.tasks.push({ ...task, id });
    },
    deleteTask(taskId: string) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      if (this.selectedTask?.id === taskId) this.selectedTask = null;
    },
    updateTask(updatedTask: Task) {
      const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = { ...this.tasks[index], ...updatedTask }; // Merge updates
        this.tasks = [...this.tasks];
      }
    },
    viewTask(task: Task) {
      this.selectedTask = task;
    },
    clearAllTasks() {
      this.tasks = [];
      this.selectedTask = null;
    },
  },
});
