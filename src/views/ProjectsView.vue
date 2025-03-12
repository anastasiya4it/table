<script lang="ts" setup>
// @ts-ignore
import Select from "../components/ui/Select.vue";
// @ts-ignore
import Search from "../components/ui/Search.vue";
// @ts-ignore
import Popup from "../components/Popup.vue";
// @ts-ignore
import ResizableTable from "../components/ResizableTable.vue";
import { compile, computed, onMounted, ref, nextTick } from "vue";
import { useProjectStore } from "../stores/projectStore";
import moment from "moment";

const header = {
  id: "ID проекту",
  name: "Назва проекту",
  numberOfTasks: "Кількість завдань",
  status: "Статус",
  date: "Дата створення",
};
const search = ref("");
const showPopup = ref(false);
const selected = ref("All");
const storeProject = useProjectStore();
const projects = computed(() => {
  return storeProject.projects;
});

const isLoading = computed(() => {
  return storeProject.isLoading;
});

const keys = Object.keys(header);

async function filterProjects(selected: string) {
  if (selected === "All") {
    storeProject.getAllProjects();
  } else {
    storeProject.getProjectsByStatus(selected);
  }
}
async function searchProjects(search: string) {
  await storeProject.getProjectsByName(search);
}

const addProject = () => {
  showPopup.value = true;
};

async function saveProject({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  if (name && description) {
    await storeProject.setNewProject({
      id: projects.value.length,
      name,
      description,
      numberOfTasks: 0,
      status: "New",
      date: moment().format("YYYY-MM-DD"),
    });
  }
  showPopup.value = false;
}
onMounted(() => {
  nextTick(async () => {
    await storeProject.getAllProjects();
  });
});
</script>

<template>
  <div class="table">
    <div class="header">
      <h1 class="card-title">Projects</h1>
      <button @click="addProject" class="button">Додати проект</button>
    </div>
    <div class="secondary">
      <Select
        :selected="selected"
        :options="[
          'All',
          'В процесі / In Progress',
          'Заплановано / Scheduled',
          'Завершено / Done',
          'Призупинено / Suspended',
          'Скасовано / Cancelled',
        ]"
        @filterProjects="filterProjects"
      />
      <Search :search="search" @searchProjects="searchProjects" />
    </div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <ResizableTable :items="projects" :keys="keys" :header="header" />
    </div>
  </div>
  <Popup
    v-if="showPopup"
    @update:showPopup="showPopup = $event"
    @saveProject="saveProject"
  />
</template>

<style lang="scss" scoped>
.full {
  //   width: 100% !important;
  height: 100vh !important;
}

.table {
  width: 100%;
}
.ids-column {
  margin-top: 20px;
  border: 1px solid #968d8d;
  padding: 10px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0 auto;
  padding: 10px 15px;
}
</style>
