import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { type ProjectItemType } from "@/types/index";

export const useProjectStore = defineStore("project", () => {
  const projects = ref<ProjectItemType[]>([]);
  const oneProject = ref<ProjectItemType | null>(null);
  const isLoading = ref<Boolean>(false);

  async function getAllProjects() {
    isLoading.value = true;
    try {
      const respons: ProjectItemType[] = await axios
        .get("http://localhost:3000/projects")
        .then((resp) => {
          return resp.data;
        });

      projects.value = respons;
    } catch (error) {
      throw new Error("Error fetching project data");
    } finally {
      isLoading.value = false;
    }
  }

  async function setNewProject({
    id,
    name,
    numberOfTasks,
    status,
    description,
    date,
  }: ProjectItemType) {
    isLoading.value = true;
    // const idx=project.value?.id;
    try {
      const respons = await axios.post("http://localhost:3000/projects", {
        id,
        name,
        numberOfTasks,
        status,
        description,
        date,
      });
      projects.value.push(respons.data);

      // comments.value = respons;
    } catch (error) {
      throw new Error("Error fetching project data");
    } finally {
      isLoading.value = false;
    }
  }

  async function getProjectsByStatus(status: string) {
    isLoading.value = true;
    try {
      const respons: ProjectItemType[] = await axios
        .get(`http://localhost:3000/projects`, {
          params: {
            status,
          },
        })
        .then((resp) => {
          return resp.data;
        });

      projects.value = respons;
    } catch (error) {
      throw new Error("Error fetching project data");
    } finally {
      isLoading.value = false;
    }
  }

  async function getProjectsByName(name: string) {
    isLoading.value = true;
    try {
      const respons: ProjectItemType[] = await axios
        .get(`http://localhost:3000/projects`, {
          params: {
            name,
          },
        })
        .then((resp) => {
          return resp.data;
        });

      projects.value = respons;
    } catch (error) {
      throw new Error("Error fetching project data");
    } finally {
      isLoading.value = false;
    }
  }

  async function getProjectsById(id: string) {
    isLoading.value = true;
    try {
      const respons: ProjectItemType = await axios
        .get(`http://localhost:3000/projects`, {
          params: {
            id,
          },
        })
        .then((resp) => {
          return resp.data;
        });

      oneProject.value = respons;
    } catch (error) {
      throw new Error("Error fetching project data");
    } finally {
      isLoading.value = false;
    }
  }

  return {
    projects,
    oneProject,
    isLoading,

    getAllProjects,
    setNewProject,
    getProjectsByStatus,
    getProjectsByName,
    getProjectsById,
  };
});
