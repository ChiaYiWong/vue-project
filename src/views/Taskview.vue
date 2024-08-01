<script setup>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

import { reactive, onMounted } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const taskId = route.params.id;

const state = reactive({
  task: {},
  isLoading: true,
});

const completetask = async () => {
  try {
    const confirm = window.confirm(
      "Are you sure you want to complete this task?"
    );
    if (confirm) {
      const response = await axios.put(`/api/tasks/${taskId}`, {
        ...state.task,
        isComplete: 1,
      });
      toast.success("Task Completed Successfully");
      router.push(`/tasks/${response.data.id}`);
      location.reload();
    }
  } catch (error) {
    console.error("Error completing task", error);
    toast.error("Task Not Completed");
  }
};

const deletetask = async () => {
  try {
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirm) {
      await axios.delete(`/api/tasks/${taskId}`);
      toast.success("task Deleted Successfully");
      router.push("/tasks");
    }
  } catch (error) {
    console.error("Error deleting task", error);
    toast.error("task Not Deleted");
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(`/api/tasks/${taskId}`);
    state.task = response.data;
  } catch (error) {
    console.error("Error fetching task", error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section v-if="!state.isLoading" class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h1 class="text-3xl font-bold mb-4">{{ state.task?.name }}</h1>
            <h3 class="text-green-800 text-lg font-bold mb-2">Task Status</h3>
            <p class="mb-4">
              {{ state.task?.isComplete == "0" ? "Pending" : "Completed" }}
            </p>
            <h3 class="text-green-800 text-lg font-bold mb-2">Task Priority</h3>
            <p class="mb-4">
              {{ state.task?.priorityLevel }}
            </p>
            <h3 class="text-green-800 text-lg font-bold mb-2">
              Task Description
            </h3>
            <p class="mb-4">
              {{ state.task?.description }}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">CreateAt</h3>

            <p class="mb-4">{{ new Date(state.task?.createdAt) }}</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside v-if="state.task.isComplete == 0">
          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage task</h3>
            <RouterLink
              :to="`/tasks/edit/${state.task?.id}`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >Edit task</RouterLink
            >
            <button
              @click="completetask"
              class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Mark as Complete
            </button>
            <button
              @click="deletetask"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Delete task
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <div v-else class="text-center text-gray-500 py-6">
    <PulseLoader />
  </div>
</template>
