<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";

const props = defineProps<{
  selected: string;
  placeholder: string;
  options: string[];
}>();
const emit = defineEmits(["filter"]);
const searchQuery = ref(props.selected);
const selectedValue = ref("");
const isDropdownVisible = ref(false);
const options = ref(props.options);

const filteredOptions = computed(() => {
  if (!searchQuery.value) {
    return options.value;
  }
  return options.value.filter((option) =>
    option.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const handleSelect = (option: string) => {
  selectedValue.value = option;
  searchQuery.value = option;
  isDropdownVisible.value = false;
  emit("filter", option);
};

const handleInput = () => {
  isDropdownVisible.value = true;
};

const handleBlur = () => {
  setTimeout(() => {
    isDropdownVisible.value = false;
  }, 200);
};

const handleKeydown = (event: KeyboardEvent) => {
  const visibleOptions = filteredOptions.value;
  const selectedIndex = visibleOptions.indexOf(selectedValue.value);

  if (event.key === "ArrowDown") {
    const nextIndex = (selectedIndex + 1) % visibleOptions.length;
    selectedValue.value = visibleOptions[nextIndex];
  } else if (event.key === "ArrowUp") {
    const prevIndex =
      (selectedIndex - 1 + visibleOptions.length) % visibleOptions.length;
    selectedValue.value = visibleOptions[prevIndex];
  } else if (event.key === "Enter") {
    handleSelect(selectedValue.value);
  }
};
</script>

<template>
  <div class="searchable" @mouseleave="handleBlur">
    <input
      type="text"
      :placeholder="props.placeholder"
      v-model="searchQuery"
      @input="handleInput"
      @keydown="handleKeydown"
      @mousedown="handleInput"
    />
    <ul v-if="isDropdownVisible">
      <li
        v-for="option in filteredOptions"
        :key="option"
        :class="{ selected: option === selectedValue }"
        @click="handleSelect(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.searchable {
  width: 300px;
  position: relative;
}

.searchable input {
  outline: none;
  width: 100%;
  //   height: 50px;
  font-size: 1rem;
  padding: 5px 10px;
  box-sizing: border-box;
  display: block;
  font-weight: 400;
  line-height: 1.6;
  background-color: #fff;
  border: 1px solid #968d8d;
  border-radius: 5px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")
    no-repeat right 0.75rem center/8px 10px;
  color: #213547;
  box-shadow: 3px 5px 5px rgb(202, 202, 202);
}

.searchable ul {
  display: block;
  list-style-type: none;
  background-color: #fff;
  border-radius: 0 0 5px 5px;
  border: 1px solid #968d8d;
  border-top: none;
  max-height: 150px;
  margin: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 0;
  position: absolute;
  z-index: 100;
  width: 100%;
  box-shadow: 3px 5px 5px rgb(202, 202, 202);
}

.searchable ul li {
  padding: 7px 9px;
  //   border-bottom: 1px solid #e1e1e1;
  cursor: pointer;
  //   color: #6e6e6e;
}

.searchable ul li.selected {
  background-color: #e8e8e8;
  //   color: #333;
}
</style>
