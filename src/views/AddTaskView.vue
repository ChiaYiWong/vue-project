<script setup>
import router from "@/router";
import { reactive } from "vue";
import { useToast } from "vue-toastification";
import axios from "axios";

const form = reactive({
  priorityLevel: "Low",
  name: "",
  description: "",
  isComplete: 0,
  createdAt: "",
});

const toast = useToast();

const handleSubmit = async () => {
  const newTask = {
    priorityLevel: form.priorityLevel,
    name: form.name,
    description: form.description,
    isComplete: 0,
    createdAt: new Date(),
  };

  try {
    const response = await axios.post("/api/tasks", newTask);
    toast.success("Task Added Successfully");
    router.push(`/tasks/${response.data.id}`);
  } catch (error) {
    console.error("Error fetching task", error);
    toast.error("Task Was Not Added");
  }
  //   console.log(newTask);
};
</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Task</h2>

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
              required
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
              required
            ></textarea>
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              priorityLevel="submit"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
