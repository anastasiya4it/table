<script lang="ts" setup>
// import VueResizable from "vue-resizable";

const props = defineProps<{
  item: {
    id: number | string;
    name: string;
    numberOfTasks: number | string;
    status: string;
    date: string;
  };
  isHeader?: boolean;
}>();
</script>

<template>
  <div :class="[isHeader ? 'row--header' : 'row--inner', 'row']">
    <!-- шаблон компонента -->
    <!-- <vue-draggable-resizable :w="100" :h="100" :parent="true"> -->
    <!-- <vue-resizable> -->
    <p class="item">{{ item.id }}</p>
    <!-- </vue-resizable> -->
    <!-- </vue-draggable-resizable>
    <vue-draggable-resizable :w="100" :h="100" :parent="true"> -->
    <!-- <vue-resizable> -->
    <p class="item">{{ item.name }}</p>
    <!-- </vue-resizable> -->
    <!-- </vue-draggable-resizable>
    <vue-draggable-resizable :w="100" :h="100" :parent="true"> -->
    <!-- <vue-resizable> -->
    <p class="item">{{ item.numberOfTasks }}</p>
    <!-- </vue-resizable> -->
    <!-- </vue-draggable-resizable>
    <vue-draggable-resizable :w="100" :h="100" :parent="true"> -->
    <!-- <vue-resizable> -->
    <p class="item">{{ item.status }}</p>
    <!-- </vue-resizable> -->
    <!-- </vue-draggable-resizable>
    <vue-draggable-resizable :w="100" :h="100" :parent="true"> -->
    <!-- <vue-resizable> -->
    <p class="item">{{ item.date }}</p>
    <!-- </vue-resizable> -->
    <!-- </vue-draggable-resizable> -->
  </div>
</template>

<style lang="scss" scoped>
.row {
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  // width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  // gap: 1rem;
}
.row--inner {
  border: 1px solid #968d8d;
}
.row--inner:hover {
  background: #ebeaea;
}
.row--header {
  background: #ebeaea;
  border: 1px solid #ebeaea;
  width: 100%;
}
.item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background: #968d8d;
  }
}
</style>
