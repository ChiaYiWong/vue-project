import { createRouter, createWebHistory } from "vue-router";

import TasksView from "@/views/TasksView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import AddTaskView from "@/views/AddTaskView.vue";
import Taskview from "@/views/Taskview.vue";
import EditTaskView from "@/views/EditTaskView.vue";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/tasks",
      name: "tasks",
      component: TasksView,
    },
    {
      path: "/tasks/:id",
      name: "task",
      component: Taskview,
    },
    {
      path: "/tasks/add",
      name: "add-task",
      component: AddTaskView,
    },
    {
      path: "/tasks/edit/:id",
      name: "edit-task",
      component: EditTaskView,
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
