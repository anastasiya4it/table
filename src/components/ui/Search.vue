<script lang="ts" setup>
const props = defineProps<{ search: string }>();
const emit = defineEmits(["searchProjects"]);
</script>

<template>
  <input
    type="text"
    :value="props.search"
    @input="emit('searchProjects', $event.target.value)"
    class="input"
  />
</template>

<style lang="scss" scoped>
.input {
  padding: 5px 10px;
  border: 1px solid #968d8d;
  border-radius: 5px;
  box-shadow: 3px 5px 5px rgb(202, 202, 202);
  font-size: 1rem;
  outline: none;
}
</style>
