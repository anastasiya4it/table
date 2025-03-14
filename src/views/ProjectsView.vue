<script lang="ts" setup>
import { Select, SelectSearch, Popup } from "../components/ui";
import { AddProject, ResizableTable } from "../components/project";
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
const allProjectsName = computed(() => {
  return ["All", ...storeProject.allProjectsName];
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
  if (search === "All") {
    storeProject.getAllProjects();
  } else {
    await storeProject.getProjectsByName(search);
  }
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
      <SelectSearch
        :options="allProjectsName"
        :selected="search"
        @filter="searchProjects"
        placeholder="Оберіь назву проекту"
      />
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
        @filter="filterProjects"
      />
    </div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <ResizableTable :items="projects" :keys="keys" :header="header" />
    </div>
  </div>
  <Popup v-if="showPopup">
    <AddProject
      @update:showPopup="showPopup = $event"
      @saveProject="saveProject"
    >
    </AddProject>
  </Popup>
</template>

<style lang="scss" scoped>
.full {
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>
