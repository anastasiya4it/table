<script lang="ts" setup>
import "@fortawesome/fontawesome-free/css/all.css";
import { ref, onMounted, computed } from "vue";
import VueResizable from "vue-resizable";

const props = defineProps<{
  header: {
    name: string;
    id: string;
    numberOfTasks: string;
    status: string;
    date: string;
  };
  items: {
    id: number;
    name: string;
    numberOfTasks: number | string;
    status: string;
    date: string;
  }[];
  keys: string[];
}>();
const items = ref(props.items);
const handlers = ref(["r"]);
const hoveredRow = ref<number | string | null>(null);

const handleMouseOver = (id: number | string) => {
  if (typeof id === "number") {
    hoveredRow.value = id;
  }
};
const handleMouseLeave = () => {
  hoveredRow.value = null;
};
function filter(event: string, id: string) {
  if (event === "up") {
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
</script>

<template>
  <div>
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
          <div style="width: 100%; height: 100%">
            <p class="resizable-content">{{ project[item] }}</p>
          </div>
        </vue-resizable>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  display: table;
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
  /* padding: 8px; */
  border: 1px solid #968d8d;
}

.header > .vue-resizable {
  resize: horizontal;
  overflow: auto;
}

.highlight-row {
  background-color: #f0f0f0;
}
</style>
