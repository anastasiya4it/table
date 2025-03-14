<script lang="ts" setup>
import moment from "moment";
import { defineProps, defineEmits, ref } from "vue";
import { Select, SelectSearch } from "../ui";

const newTaskName = ref("");
const newTaskDescription = ref("");
const newTaskStatus = ref("");
const newTaskAssignee = ref("");
const newTaskDate = ref("");
const errorMessage = ref("");

const props = defineProps<{
  allAssignee: string[];
}>();
const emit = defineEmits(["update:showPopup", "saveTask"]);

const closePopup = () => {
  emit("update:showPopup", false);
};

const saveTask = () => {
  if (
    !newTaskName.value ||
    !newTaskDescription.value ||
    !newTaskStatus.value ||
    !newTaskAssignee.value ||
    !newTaskDate.value
  ) {
    errorMessage.value = "Все поля должны быть заполнены.";
    return;
  }
  emit("saveTask", {
    name: newTaskName.value,
    description: newTaskDescription.value,
    status: newTaskStatus.value,
    assignee: newTaskAssignee.value,
    date: moment(newTaskDate.value).format("YYYY-MM-DD"),
  });
  newTaskName.value = "";
  newTaskDescription.value = "";
  newTaskStatus.value = "";
  newTaskAssignee.value = "";
  newTaskDate.value = "";
  errorMessage.value = "";
};
function filterAssignee(value: string) {
  newTaskAssignee.value = value;
}
function filterStatus(value: string) {
  newTaskStatus.value = value;
}
</script>

<template>
  <h2>Додати завдання</h2>
  <div class="popup__inner">
    <label class="popup__label">
      <p>Завдання:</p>
      <textarea
        required
        row="2"
        wrap="hard"
        v-model="newTaskName"
        type="text"
        class="popup__input popup__full-width textarea"
      />
    </label>
    <label class="popup__label">
      <p>Опис:</p>
      <textarea
        required
        row="3"
        wrap="hard"
        v-model="newTaskDescription"
        type="text"
        class="popup__input popup__full-width textarea"
      />
    </label>
    <label class="popup__label">
      <p>Виконавець:</p>
      <SelectSearch
        :options="allAssignee"
        :selected="newTaskAssignee"
        @filter="filterAssignee"
        placeholder="Оберіть віконавця"
      />
    </label>
    <label class="popup__label popup__label--row">
      <p>Статус:</p>
      <Select
        :selected="newTaskStatus"
        :options="['All', 'To Do', 'In Progress', 'Done']"
        @filter="filterStatus"
        class="popup__full-width"
      />
    </label>

    <label class="popup__label popup__label--row">
      <p>Термін віконання:</p>
      <input v-model="newTaskDate" type="date" class="popup__input" />
    </label>
    <div class="popup__button">
      <button @click="saveTask">Зберегти</button>
      <button @click="closePopup">Відмінити</button>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<style lang="scss" scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
