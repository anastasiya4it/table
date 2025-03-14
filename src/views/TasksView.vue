<script lang="ts" setup>
import { Select, SelectSearch, ButtonSort, Popup } from "../components/ui";
import { AddTask } from "../components/task";
import { ResizableTable } from "../components/project";

import { VueDraggableNext as draggable } from "vue-draggable-next";
import { useProjectStore } from "../stores/projectStore";
import { useTaskStore } from "../stores/taskStore";
import { compile, computed, onMounted, ref, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import { Status } from "../types/index";
import { type TaskItemType } from "../types/index";

const route = useRoute();
const storeProject = useProjectStore();
const storeTask = useTaskStore();

const showPopup = ref(false);
const selectAssignee = ref<string>("");
const selectedStatus = ref("All");
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

const isLoading = computed(() => {
  return storeProject.isLoading || storeTask.isLoading;
});
const oneProject = computed(() => {
  return storeProject.oneProject;
});
const tasks = computed(() => {
  return storeTask.tasks;
});
const listTasksToDo = ref<TaskItemType[]>([]);
const listTasksInProgress = ref<TaskItemType[]>([]);
const listTasksDone = ref<TaskItemType[]>([]);
let id = 1;

const addProject = () => {
  showPopup.value = true;
};
function filter([event, id, items]: [
  string,
  keyof TaskItemType,
  TaskItemType[]
]) {
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
    // await storeTask.setNewStatus(e.added.element.taskId, listName);  //не працює
  }
}
function arrayListTasks() {
  listTasksToDo.value = tasks.value.filter((task) => task.status === "To Do");
  listTasksInProgress.value = tasks.value.filter(
    (task) => task.status === "In Progress"
  );
  listTasksDone.value = tasks.value.filter((task) => task.status === "Done");
}

async function saveTask({
  name,
  status,
  date,
  description,
  assignee,
}: {
  name: string;
  status: Status;
  date: string;
  description: string;
  assignee: string;
}) {
  if (name && description) {
    await storeTask.setNewTask({
      taskId: tasks.value.length,
      projectId: route.params.project as string,
      name,
      status,
      assignee,
      description,
      date,
    });
  }
  arrayListTasks();
  showPopup.value = false;
}

async function filterTask(filter: string, selected: string) {
  console.log(filter, selected);
  filter === "assignee"
    ? (selectAssignee.value = selected)
    : (selectedStatus.value = selected);
  if (selected === "All") {
    await storeTask.getAllTasksForOneProject(route.params.project as string);
  } else {
    await storeTask.getAllTasksWithFilters({
      projectId: route.params.project as string,
      filter: filter,
      valueFilter: selected,
    });
  }
  arrayListTasks();
}

onMounted(() => {
  nextTick(async () => {
    await storeProject.getProjectsById(route.params.project as string);
    await storeTask.getAllTasksForOneProject(route.params.project as string);
    arrayListTasks();
  });
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>

  <div v-else-if="oneProject">
    <div class="row">
      <h1 class="card-title">{{ oneProject[0].name }}</h1>
      <button @click="addProject" class="button">
        <i class="fa-duotone fa-solid fa-plus fa-beat fa-xs"></i>
      </button>
    </div>
    <div class="filter__container">
      <SelectSearch
        :options="allAssignee"
        :selected="selectAssignee"
        @filter="filterTask('assignee', $event)"
        placeholder="Оберіть віконавця"
      />
      <Select
        :selected="selectedStatus"
        :options="['All', 'To Do', 'In Progress', 'Done']"
        @filter="filterTask('status', $event)"
      />
    </div>

    <div class="col-4" v-if="listTasksToDo.length">
      <h3>Треба зробити / To Do</h3>
      <div class="draggable__header">
        <div
          v-for="(value, key) in Object.entries(header)"
          :key="key"
          class="draggable__item"
        >
          {{ value[1] }}
          <ButtonSort
            @filter="filter"
            :value="value[0]"
            :list="listTasksToDo"
          />
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
    <div class="col-4" v-if="listTasksInProgress.length">
      <h3>В процесі / In Progress</h3>
      <div class="draggable__header">
        <div
          v-for="(value, key) in Object.entries(header)"
          :key="key"
          class="draggable__item"
        >
          {{ value[1] }}
          <ButtonSort
            @filter="filter"
            :value="value[0]"
            :list="listTasksInProgress"
          />
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
    <div class="col-4" v-if="listTasksDone.length">
      <h3>Зроблено / Done</h3>
      <div class="draggable__header">
        <div
          v-for="(value, key) in Object.entries(header)"
          :key="key"
          class="draggable__item"
        >
          {{ value[1] }}
          <ButtonSort
            @filter="filter"
            :value="value[0]"
            :list="listTasksDone"
          />
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
    <Popup v-if="showPopup">
      <AddTask
        :allAssignee="allAssignee"
        @update:showPopup="showPopup = $event"
        @saveTask="saveTask"
      />
    </Popup>
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
.row {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
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
