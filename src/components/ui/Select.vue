<script lang="ts" setup>
const props = defineProps<{
  selected: string;
  options: string[];
}>();
const emit = defineEmits(["filterProjects"]);
</script>

<template>
  <select
    :value="props.selected"
    @change="emit('filterProjects', $event.target.value)"
    class="select"
  >
    <option v-for="(item, idx) in props.options" :key="idx" :value="item">
      {{ item }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
.select {
  padding: 5px 10px;
  border: 1px solid #968d8d;
  border-radius: 5px;
  box-shadow: 3px 5px 5px rgb(202, 202, 202);
  font-size: 1rem;
  outline: none;
}
</style>
