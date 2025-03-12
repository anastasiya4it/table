import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { type TaskItemType } from "@/types/index";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref<TaskItemType[]>([]);
  const oneTask = ref<TaskItemType | null>(null);
  const isLoading = ref<Boolean>(false);
  const allAssignee = ref<string[]>([]);

  async function getAllTasksForOneProject(projectId: string) {
    isLoading.value = true;
    try {
      const respons: TaskItemType[] = await axios
        .get("http://localhost:3000/tasks", {
          params: {
            projectId,
          },
        })
        .then((resp) => {
          return resp.data;
        });

      tasks.value = respons;
      allAssignee.value = Array.from(
        new Set(respons.map((task) => task.assignee))
      );
    } catch (error) {
      throw new Error("Error fetching project data");
    } finally {
      isLoading.value = false;
    }
  }
  async function getAllTasksWithFilters({
    projectId,
    filter,
    valueFilter,
  }: {
    projectId: string;
    filter: string;
    valueFilter: string;
  }) {
    isLoading.value = true;
    try {
      const respons: TaskItemType[] = await axios
        .get("http://localhost:3000/tasks", {
          params: {
            projectId,
            [filter]: valueFilter,
          },
        })
        .then((resp) => {
          return resp.data;
        });

      tasks.value = respons;
    } catch (error) {
      throw new Error("Error fetching project data");
    } finally {
      isLoading.value = false;
    }
  }

  async function setNewStatus(taskId: string, status: string) {
    isLoading.value = true;
    try {
      const response = await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
        {
          status: status,
        }
      );
      if (response.status !== 200) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }
      console.log(`Status of task ${taskId} updated to ${status}`);
    } catch (error) {
      console.error("Error updating task status:", error);
      throw new Error("Error updating task status");
    } finally {
      isLoading.value = false;
    }
  }

  return {
    tasks,
    allAssignee,
    isLoading,

    getAllTasksForOneProject,
    setNewStatus,
    getAllTasksWithFilters,
  };
});
