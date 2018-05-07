import { AsyncStorage } from "react-native";

let tasksKey = "tasks";
export default class TaskService {
  async saveTask(task) {
    return AsyncStorage.setItem("@task:" + task.id, JSON.stringify(task));
  }

  deleteTask(taskId) {
    AsyncStorage.removeItem("@task:" + taskId);
  }

  async getAllToDoTasks() {
    return this.getAllTasks().then(tasks => {
      return tasks.filter(value => {
        return !value.done;
      });
    });
ß  }

  async getAllDoneTasks() {
    return this.getAllTasks().then(tasks => {
      return tasks.filter(value => {
        return value.done;
      });
    });
  }

  getAllTasks() {
    return AsyncStorage.getAllKeys()
      .then(keys => {
        let fetchKeys = keys.filter(key => {
          return key.startsWith("@task:");
        });
        return AsyncStorage.multiGet(fetchKeys);
      })
      .then(result => {
        return result.map(r => {
          return JSON.parse(r[1]);
        });
      })
      .then(tasks => {
        return tasks.sort(value => {
          return value.date;
        });
      });
  }
}
