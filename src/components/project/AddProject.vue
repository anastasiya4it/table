<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";

const newProjectName = ref("");
const newProjectDescription = ref("");
const emit = defineEmits(["update:showPopup", "saveProject"]);

const closePopup = () => {
  emit("update:showPopup", false);
};

const saveProject = () => {
  emit("saveProject", {
    name: newProjectName.value,
    description: newProjectDescription.value,
  });
  newProjectName.value = "";
  newProjectDescription.value = "";
};
</script>

<template>
  <h2>Додати проект</h2>
  <div class="popup__inner">
    <label class="popup__label">
      Назва:
      <input v-model="newProjectName" type="text" class="popup__input" />
    </label>
    <label class="popup__label">
      Опис:
      <input v-model="newProjectDescription" type="text" class="popup__input" />
    </label>
    <div class="popup__button">
      <button @click="saveProject">Зберегти</button>
      <button @click="closePopup">Відмінити</button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
