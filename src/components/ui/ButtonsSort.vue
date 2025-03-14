<script lang="ts" setup>
import { type TaskItemType } from "../../types/index";
import { defineProps, defineEmits } from "vue";
import "@fortawesome/fontawesome-free/css/all.css";

const props = defineProps<{
  value: keyof TaskItemType | string;
  list?: TaskItemType[];
}>();

const emit = defineEmits(["filter"]);

const handleFilter = (direction: string) => {
  emit("filter", direction, props.value);
};
</script>

<template>
  <div class="header__buttons">
    <button @click="handleFilter('down')">
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
    <button @click="handleFilter('up')">
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
</template>

<style lang="scss" scoped>
.header__buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 0.5rem;
}
</style>
