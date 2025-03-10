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
  <div class="popup">
    <div class="popup__content">
      <h2>Добавить проект</h2>
      <div class="popup__inner">
        <label class="popup__label">
          Название:
          <input v-model="newProjectName" type="text" class="popup__input" />
        </label>
        <label class="popup__label">
          Описание:
          <input
            v-model="newProjectDescription"
            type="text"
            class="popup__input"
          />
        </label>
        <div class="popup__button">
          <button @click="saveProject">Сохранить</button>
          <button @click="closePopup">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup__content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.popup__label {
  display: block;
}
.popup__inner {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.popup__input {
  padding: 0.5rem;
  border: 1px solid #968d8d;
  border-radius: 5px;
}
</style>
