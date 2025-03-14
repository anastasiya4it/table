<script lang="ts" setup>
import { ButtonSort } from "../ui";
import { ref, onMounted, computed } from "vue";
import VueResizable from "vue-resizable";
import type { ProjectItemType, TaskItemType } from "../../types/index";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  header: ProjectItemType | TaskItemType;
  items: ProjectItemType[] | TaskItemType[];
  keys: string[];
}>();
const items = ref(props.items);
const handlers = ref(["r"]);
const hoveredRow = ref<number | string | null>(null);

const handleMouseOver = (id: number | string) => {
  hoveredRow.value = id;
};
const handleMouseLeave = () => {
  hoveredRow.value = null;
};
function filter(direction: string, id: string) {
  if (direction === "up") {
    items.value.sort((a, b) => {
      if (a[id] > b[id]) {
        return 1;
      }
      if (a[id] < b[id]) {
        return -1;
      }
      return 0;
    });
  } else {
    items.value.sort((a, b) => {
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
function navigateToPage(project: string) {
  router.push({ name: "tasks", params: { project } });
}
</script>

<template>
  <div class="table-container">
    <div class="table-row header">
      <vue-resizable
        class="table-cell"
        :active="handlers"
        v-for="item in keys"
        :key="item"
        :fitParent="true"
      >
        <div style="width: 100%; height: 100%">
          <p class="resizable-content">{{ props.header[item] }}</p>
          <ButtonSort @filter="filter" :value="item" />
          <!-- <div class="header__buttons">
            <button @click="filter('down', item)">
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
            <button @click="filter('up', item)">
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
          </div> -->
        </div>
      </vue-resizable>
    </div>
    <div
      class="table-row"
      v-for="project in items"
      :key="project.id"
      @mouseover="handleMouseOver(project.id)"
      @mouseleave="handleMouseLeave"
      :class="{ 'highlight-row': hoveredRow == project.id }"
    >
      <vue-resizable
        class="table-cell"
        :active="handlers"
        v-for="item in keys"
        :key="item"
        :fitParent="true"
      >
        <a @click.prevent="navigateToPage(project.id)">
          <div style="width: 100%; height: 100%">
            <p class="resizable-content">{{ project[item] }}</p>
          </div>
        </a>
      </vue-resizable>
    </div>
  </div>
</template>

<style scoped>
.header__buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 0.5rem;
}
.table-container {
  display: table;
  box-shadow: 3px 5px 5px #cacaca;
  overflow: hidden;
}
.arrow-button {
  width: 10px;
  height: 10px;
}
.table-row {
  display: table-row;
}

.table-cell {
  display: table-cell;
  border: 1px solid #968d8d;
}

.header > .vue-resizable {
  resize: horizontal;
  overflow: auto;
}

.highlight-row {
  background-color: #cacaca41;
}
</style>
