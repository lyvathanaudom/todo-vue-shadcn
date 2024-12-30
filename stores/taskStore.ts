import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
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
      const today = new Date().toISOString().split('T')[0];
      return state.tasks.filter((task) => task.date === today);
    },
    importantTasks: (state) => state.tasks.filter((task) => task.important),
  },
  actions: {
    addTask(task: { title: string; note: string; date: string; important: boolean; completed: boolean }) {
      const id = Math.random().toString(36).substr(2, 9); // Generate a unique ID
      this.tasks.push({ ...task, id });
    },
    deleteTask(taskId: string) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      if (this.selectedTask?.id === taskId) this.selectedTask = null;
    },
    updateTask(updatedTask: {
      id: string;
      title: string;
      note: string;
      date: string;
      important: boolean;
      completed: boolean;
    }) {
      const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    },
    viewTask(task){
        this.selectedTask = task;
    }
    ,
    // markComplete(id: string) {
    //   const task = this.tasks.find((task) => task.id === id);
    //   if (task) task.completed = !task.completed;
    //   console.log(id + 'is completed' )
    // },
    markComplete(taskId: string) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) {
        console.log("Before toggle:", task.completed);
        task.completed = !task.completed;
        console.log("After toggle:", task.completed);
           // Force reactivity if necessary
    this.tasks = [...this.tasks];
      }
    },    
    toggleImportant(taskId: string) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) {
        task.important = !task.important;
      }
    },
  },
});
