import { AsyncStorage } from 'react-native';

let tasksKey = 'tasks'
export default class TaskService {

    async insertTask(task) {
        return AsyncStorage.setItem('@task:' + task.id, JSON.stringify(task));
    }

    async getAllTasks() {
        return AsyncStorage.getAllKeys()
        .then(function (keys) {
            var fetchKeys = keys.filter(function (key) { return key.startsWith('@task:'); });
            return AsyncStorage.multiGet(fetchKeys);
        })
        .then(function (result) {
            return result.map(function (r) { return JSON.parse(r[1]); });
        })
    }
}