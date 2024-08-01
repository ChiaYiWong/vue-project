<script>
import { reactive, toRefs, onMounted } from "vue";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridVue } from "ag-grid-vue3"; // Vue Data Grid Component
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "App",
  components: {
    AgGridVue, // Add Vue Data Grid component
  },

  setup() {
    const state = reactive({
      rowData: [],
      colDefs: [
        { field: "id", flex: 1 },
        { field: "name", flex: 1 },
        { field: "priorityLevel", flex: 1 }, // Corrected field name
        {
          field: "isComplete",
          flex: 1,
          valueFormatter: (p) => (p.value == "0" ? "Pending" : "Completed"),
        },
        { field: "createdAt", flex: 1 },
      ],
      isLoading: true,
    });

    const router = useRouter();

    onMounted(async () => {
      try {
        const response = await axios.get("/api/tasks");

        state.rowData = response.data; // Assuming the data is in tasks
        state.isLoading = false;
        // console.log("done", state.rowData);
      } catch (error) {
        state.isLoading = false;
        console.error("Error fetching tasks:", error);
      }
    });

    const onRowClicked = (event) => {
      const taskId = event.data.id;
      console.log("Row clicked:", event.data);
      router.push(`/tasks/${taskId}`);
    };
    console.log("before return", state.rowData);
    return {
      ...toRefs(state),
      onRowClicked,
    };
  },
};
</script>

<template>
  <div>
    <!-- Display a loading message or spinner while data is being fetched -->
    <div v-if="isLoading" class="loading">Loading data, please wait...</div>

    <!-- The AG Grid component, rendered only when data is loaded -->
    <ag-grid-vue
      v-else
      :rowData="rowData"
      :columnDefs="colDefs"
      @rowClicked="onRowClicked"
      style="height: 500px"
      class="ag-theme-quartz"
    >
    </ag-grid-vue>
  </div>
</template>

<style>
.ag-theme-quartz {
  /* Changes the color of the grid text */
  --ag-foreground-color: rgb(14, 68, 145);
  /* Changes the color of the grid background */
  --ag-background-color: rgb(241, 247, 255);
  /* Changes the header color of the top row */
  --ag-header-background-color: rgb(228, 237, 250);
  /* Changes the hover color of the row*/
  --ag-row-hover-color: rgb(216, 226, 255);
}
</style>
