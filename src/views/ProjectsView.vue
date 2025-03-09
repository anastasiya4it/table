<script lang="ts" setup>
// import "vue-draggable-resizable/style.css";
// @ts-ignore
import ProjectItem from "../components/ProjectItem.vue";
// import { ProjectItem } from "../components/ProjectItem.vue";
// @ts-ignore
import ProjectTable from "../components/ProjectTable.vue";
import { ref } from "vue";

const projects = [
  {
    id: 0,
    name: "John 1",
    numberOfTasks: 3,
    status: "In progress",
    date: "2021-10-10",
  },
  {
    id: 1,
    name: "Joao 2",

    numberOfTasks: 5,
    status: "In progress",
    date: "2021-10-10",
  },
  {
    name: "Jean 3",
    id: 2,
    numberOfTasks: 2,
    status: "In progress",
    date: "2021-10-10",
  },
  {
    name: "Jonny 4",
    id: 3,
    numberOfTasks: 1,
    status: "In progress",
    date: "2021-10-10",
  },
  {
    name: "Guisepe 5",
    id: 4,
    numberOfTasks: 4,
    status: "In progress",
    date: "2021-10-10",
  },
];
const header = {
  name: "Назва проекту",
  id: "ID проекту",
  numberOfTasks: "Кількість завдань",
  status: "Статус",
  date: "Дата створення",
};
const keys = Object.keys(projects[0]);
console.log(keys);

const showPopup = ref(false);
const newProjectName = ref("");
const newProjectDescription = ref("");

const addProject = () => {
  showPopup.value = true;
};

const saveProject = () => {
  if (newProjectName.value && newProjectDescription.value) {
    projects.push({
      id: projects.length,
      name: newProjectName.value,
      numberOfTasks: 0,
      status: "New",
      date: new Date().toISOString().split("T")[0],
    });
    showPopup.value = false;
    newProjectName.value = "";
    newProjectDescription.value = "";
  }
};
</script>

<template>
  <div class="table">
    <div class="header">
      <h1 class="card-title">Projects</h1>
      <button @click="addProject">Додати проект</button>
    </div>
    <ProjectTable :items="projects" :keys="keys" :header="header" />
  </div>
  <div v-if="showPopup" class="popup">
    <div class="popup__content">
      <h2>Добавить проект</h2>
      <div class="popup__inner">
        <label class="popup__label">
          Название:
          <input v-model="newProjectName" type="text" class="popup__input" />
        </label>
        <label class="popup__label">
          Описание:
          <input
            v-model="newProjectDescription"
            type="text"
            class="popup__input"
          />
        </label>
        <div class="popup__button">
          <button @click="saveProject">Сохранить</button>
          <button @click="showPopup = false">Отмена</button>
        </div>
      </div>
    </div>
  </div>
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
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup__content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.popup__label {
  display: block;
}
.popup__inner {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.popup__input {
  padding: 0.5rem;
  border: 1px solid #968d8d;
  border-radius: 5px;
}
</style>
