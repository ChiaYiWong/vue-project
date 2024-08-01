<script setup>
import router from "@/router";
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import axios from "axios";

const route = useRoute();

const taskId = route.params.id;

const form = reactive({
  priorityLevel: "Low",
  name: "",
  description: "",
  isComplete: 0,
  createdAt: "",
});

const state = reactive({
  task: {},
  isLoading: true,
});

const toast = useToast();

const handleSubmit = async () => {
  const updatedTask = {
    priorityLevel: form.priorityLevel,
    name: form.name,
    description: form.description,
    isComplete: 0,
    createdAt: new Date(),
  };

  try {
    const response = await axios.put(`/api/tasks/${taskId}`, updatedTask);
    toast.success("Task Updated Successfully");
    router.push(`/tasks/${response.data.id}`);
  } catch (error) {
    console.error("Error fetching task", error);
    toast.error("Task Was Not Update");
  }
  //   console.log(newTask);
};

onMounted(async () => {
  try {
    const response = await axios.get(`/api/tasks/${taskId}`);
    state.task = response.data;
    // Populate inputs
    form.priorityLevel = state.task.priorityLevel;
    form.name = state.task.name;
    form.description = state.task.description;
    form.isComplete = state.task.isComplete;
    form.createdAt = state.task.createdAt;
  } catch (error) {
    console.error("Error fetching task", error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Edit Task</h2>

          <h3 class="text-2xl mb-5">Task Info</h3>

          <div class="mb-4">
            <label
              for="priorityLevel"
              class="block text-gray-700 font-bold mb-2"
              >Task Type</label
            >
            <select
              v-model="form.priorityLevel"
              id="priorityLevel"
              name="priorityLevel"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="company" class="block text-gray-700 font-bold mb-2"
              >Task Name</label
            >
            <input
              priorityLevel="text"
              v-model="form.name"
              id="name"
              name="name"
              class="border rounded w-full py-2 px-3"
            />
          </div>

          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2"
              >Description</label
            >
            <textarea
              id="description"
              v-model="form.description"
              name="description"
              class="border rounded w-full py-2 px-3"
              rows="4"
            ></textarea>
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              priorityLevel="submit"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
