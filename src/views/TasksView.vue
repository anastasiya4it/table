<script lang="ts" setup>
import "@fortawesome/fontawesome-free/css/all.css";
// @ts-ignore
import SelectSearch from "../components/ui/SelectSearch.vue";
// @ts-ignore
import Select from "../components/ui/Select.vue";
// import draggable from "@/vue-draggable-next";
import { VueDraggableNext as draggable } from "vue-draggable-next";
import { useProjectStore } from "../stores/projectStore";
import { useTaskStore } from "../stores/taskStore";
import { compile, computed, onMounted, ref, nextTick, watch } from "vue";
// @ts-ignore
import ResizableTable from "../components/ResizableTable.vue";
import { useRoute } from "vue-router";
import { Status } from "../types/index";
import { type TaskItemType } from "../types/index";

const route = useRoute();
const storeProject = useProjectStore();
const storeTask = useTaskStore();
const isLoading = computed(() => {
  return storeProject.isLoading || storeTask.isLoading;
});
const selectAssignee = ref("");
const selected = ref("All");
const allAssignee = computed(() => {
  return ["All", ...storeTask.allAssignee];
});
const header = {
  taskId: "ID завдання",
  name: "Назва завдання",
  assignee: "Виконавець",
  status: "Статус",
  date: "Термін виконання",
};
const keys = Object.keys(header);

const oneProject = computed(() => {
  return storeProject.oneProject;
});
const tasks = computed(() => {
  return storeTask.tasks;
});
const listTasksToDo = ref();
const listTasksInProgress = ref();
const listTasksDone = ref();
let id = 1;

function filter(event: string, id: keyof TaskItemType, items: TaskItemType[]) {
  if (event === "up") {
    items.sort((a, b) => {
      if (a[id] > b[id]) {
        return 1;
      }
      if (a[id] < b[id]) {
        return -1;
      }
      return 0;
    });
  } else {
    items.sort((a, b) => {
      if (a[id] < b[id]) {
        return 1;
      }
      if (a[id] > b[id]) {
        return -1;
      }
      return 0;
    });
  }
}

async function listTasksToDoEvent(e: any, listName: Status) {
  if (e.removed) {
  }
  if (e.added) {
    const newTask = {
      status: listName,
    };
    // await storeTask.setNewStatus(e.added.element.taskId, listName);
  }
}
async function filterTask(selected: string) {
  selectAssignee.value = selected;
  if (selected === "All") {
    await storeTask.getAllTasksForOneProject(route.params.project as string);
  } else {
    await storeTask.getAllTasksWithFilters({
      projectId: route.params.project as string,
      filter: "assignee",
      valueFilter: selected,
    });
  }
  listTasksToDo.value = tasks.value.filter((task) => task.status === "To Do");
  listTasksInProgress.value = tasks.value.filter(
    (task) => task.status === "In Progress"
  );
  listTasksDone.value = tasks.value.filter((task) => task.status === "Done");
}
onMounted(() => {
  nextTick(async () => {
    await storeProject.getProjectsById(route.params.project as string);
    await storeTask.getAllTasksForOneProject(route.params.project as string);
    listTasksToDo.value = tasks.value.filter((task) => task.status === "To Do");
    listTasksInProgress.value = tasks.value.filter(
      (task) => task.status === "In Progress"
    );
    listTasksDone.value = tasks.value.filter((task) => task.status === "Done");
  });
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>

  <div v-else-if="oneProject" class="row">
    <h1 class="card-title">{{ oneProject[0].name }}</h1>
    <div class="filter__container">
      <SelectSearch
        :options="allAssignee"
        :selected="selectAssignee"
        @filter="filterTask"
        placeholder="Оберіть віконавця"
      />
      <Select
        :selected="selected"
        :options="[
          'All',
          'Треба зробити / To Do',
          'В процесі / In Progress',
          'Зроблено / Done',
        ]"
        @filter="filterStatus"
      />
    </div>

    <div class="col-4">
      <h3>Треба зробити / To Do</h3>
      <div class="draggable__header">
        <div
          v-for="(value, key) in Object.entries(header)"
          :key="key"
          class="draggable__item"
        >
          {{ value[1] }}
          <div class="header__buttons">
            <button @click="filter('down', value[0], listTasksToDo)">
              <i
                class="fa-duotone fa-solid fa-arrow-down fa-bounce fa-xs"
                style="
                  --fa-bounce-start-scale-x: 1;
                  --fa-bounce-start-scale-y: 1;
                  --fa-bounce-jump-scale-x: 1;
                  --fa-bounce-jump-scale-y: 1;
                  --fa-bounce-land-scale-x: 1;
                  --fa-bounce-land-scale-y: 1;
                "
              ></i>
            </button>
            <button @click="filter('up', value[0], listTasksToDo)">
              <i
                class="fa-solid fa-arrow-up fa-bounce fa-xs"
                style="
                  --fa-bounce-start-scale-x: 1;
                  --fa-bounce-start-scale-y: 1;
                  --fa-bounce-jump-scale-x: 1;
                  --fa-bounce-jump-scale-y: 1;
                  --fa-bounce-land-scale-x: 1;
                  --fa-bounce-land-scale-y: 1;
                "
              ></i>
            </button>
          </div>
        </div>
      </div>
      <draggable
        id="first"
        data-source="juju"
        :list="listTasksToDo"
        class="list-group"
        draggable=".item"
        group="a"
        @change="listTasksToDoEvent($event, 'To Do')"
      >
        <div
          class="list-group-item item"
          v-for="element in listTasksToDo"
          :key="element"
        >
          <!-- {{ element.name }} -->
          <div class="draggable__header">
            <div class="draggable__item">{{ element.taskId }}</div>
            <div class="draggable__item">{{ element.name }}</div>
            <div class="draggable__item">{{ element.assignee }}</div>
            <div class="draggable__item">{{ element.status }}</div>
            <div class="draggable__item">{{ element.date }}</div>
          </div>
        </div>
        <template v-slot:header>
          <div
            class="btn-group list-group-item"
            role="group"
            aria-label="Basic example"
          >
            <button class="btn btn-secondary" @click="add">Add</button>
            <button class="btn btn-secondary" @click="replace">Replace</button>
          </div>
        </template>
      </draggable>
    </div>
    <div class="col-4">
      <h3>В процесі / In Progress</h3>
      <div class="draggable__header">
        <div
          v-for="(value, key) in Object.entries(header)"
          :key="key"
          class="draggable__item"
        >
          {{ value[1] }}
          <div class="header__buttons">
            <button @click="filter('down', value[0], listTasksInProgress)">
              <i
                class="fa-duotone fa-solid fa-arrow-down fa-bounce fa-xs"
                style="
                  --fa-bounce-start-scale-x: 1;
                  --fa-bounce-start-scale-y: 1;
                  --fa-bounce-jump-scale-x: 1;
                  --fa-bounce-jump-scale-y: 1;
                  --fa-bounce-land-scale-x: 1;
                  --fa-bounce-land-scale-y: 1;
                "
              ></i>
            </button>
            <button @click="filter('up', value[0], listTasksInProgress)">
              <i
                class="fa-solid fa-arrow-up fa-bounce fa-xs"
                style="
                  --fa-bounce-start-scale-x: 1;
                  --fa-bounce-start-scale-y: 1;
                  --fa-bounce-jump-scale-x: 1;
                  --fa-bounce-jump-scale-y: 1;
                  --fa-bounce-land-scale-x: 1;
                  --fa-bounce-land-scale-y: 1;
                "
              ></i>
            </button>
          </div>
        </div>
      </div>
      <draggable
        id="InProgress"
        :list="listTasksInProgress"
        class="list-group"
        draggable=".item"
        group="a"
        @change="listTasksToDoEvent($event, 'In Progress')"
      >
        <div
          class="list-group-item item"
          v-for="element in listTasksInProgress"
          :key="element"
        >
          <!-- {{ element.name }} -->
          <div class="draggable__header">
            <div class="draggable__item">{{ element.taskId }}</div>
            <div class="draggable__item">{{ element.name }}</div>
            <div class="draggable__item">{{ element.assignee }}</div>
            <div class="draggable__item">{{ element.status }}</div>
            <div class="draggable__item">{{ element.date }}</div>
          </div>
        </div>
        <template v-slot:header>
          <div
            class="btn-group list-group-item"
            role="group"
            aria-label="Basic example"
          >
            <button class="btn btn-secondary" @click="add">Add</button>
            <button class="btn btn-secondary" @click="replace">Replace</button>
          </div>
        </template>
      </draggable>
    </div>
    <div class="col-4">
      <h3>Зроблено / Done</h3>
      <div class="draggable__header">
        <div
          v-for="(value, key) in Object.entries(header)"
          :key="key"
          class="draggable__item"
        >
          {{ value[1] }}
          <div class="header__buttons">
            <button @click="filter('down', value[0], listTasksDone)">
              <i
                class="fa-duotone fa-solid fa-arrow-down fa-bounce fa-xs"
                style="
                  --fa-bounce-start-scale-x: 1;
                  --fa-bounce-start-scale-y: 1;
                  --fa-bounce-jump-scale-x: 1;
                  --fa-bounce-jump-scale-y: 1;
                  --fa-bounce-land-scale-x: 1;
                  --fa-bounce-land-scale-y: 1;
                "
              ></i>
            </button>
            <button @click="filter('up', value[0], listTasksDone)">
              <i
                class="fa-solid fa-arrow-up fa-bounce fa-xs"
                style="
                  --fa-bounce-start-scale-x: 1;
                  --fa-bounce-start-scale-y: 1;
                  --fa-bounce-jump-scale-x: 1;
                  --fa-bounce-jump-scale-y: 1;
                  --fa-bounce-land-scale-x: 1;
                  --fa-bounce-land-scale-y: 1;
                "
              ></i>
            </button>
          </div>
        </div>
      </div>
      <draggable
        id="Done"
        :list="listTasksDone"
        class="list-group"
        draggable=".item"
        group="a"
        @change="listTasksToDoEvent($event, 'Done')"
      >
        <div
          class="list-group-item item"
          v-for="element in listTasksDone"
          :key="element.name"
        >
          <!-- {{ element.name }} -->
          <div class="draggable__header">
            <div class="draggable__item">{{ element.taskId }}</div>
            <div class="draggable__item">{{ element.name }}</div>
            <div class="draggable__item">{{ element.assignee }}</div>
            <div class="draggable__item">{{ element.status }}</div>
            <div class="draggable__item">{{ element.date }}</div>
          </div>
        </div>
        <template v-slot:header>
          <div
            class="btn-group list-group-item"
            role="group"
            aria-label="Basic example"
          >
            <button class="btn btn-secondary" @click="add">Add</button>
            <button class="btn btn-secondary" @click="replace">Replace</button>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter__container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.header__buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 0.5rem;
}
.draggable__header {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
}
.draggable__item {
  display: table-cell;
  border: 1px solid #968d8d;
  padding: 1rem 0;
}
</style>
