import AsyncStorage from "@react-native-async-storage/async-storage"
import { Task } from "../Types/Task"

export const setTasks = async (key: Date, value: Task[]): Promise<void> => {
  try {
    if (value?.length > 0) {
      const jsonValue = JSON.stringify(value) // AsyncStorage can only store strings as values
      await AsyncStorage.setItem(`@${key.toDateString()}`, jsonValue)
    }
    else {
      // if no tasks, delete key from db
      deleteTasks(key)
    }
  }
  catch (e) {
    // error handling
  }
}

export const getTasks = async (key: Date): Promise<Task[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key.toDateString()}`) // returns a string
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } 
  catch(e) {
    console.log(e)
    // error handling
  }
}

export const deleteTasks = async (key: Date)  => {
  try {
    AsyncStorage.removeItem(`@${key.toDateString()}`)
  }
  catch (e) {
    // error handling
  }
}

export const moveIncompleteTasksToToday = async () => {
  let tasks

  const today = new Date()

  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  const yesterdaysTasks = await getTasks(yesterday)

  if (yesterdaysTasks?.length > 0) {
    const incompleteTasks = yesterdaysTasks.filter(task => !("completedDate" in task))
    if (incompleteTasks.length > 0) {
      const todaysTasks = await getTasks(today)
      tasks = todaysTasks?.length > 0 ? [...todaysTasks, ...incompleteTasks] : incompleteTasks
      const completedTasks = yesterdaysTasks.filter(task => "completedDate" in task)
      if (completedTasks.length > 0) {
        await setTasks(yesterday, completedTasks)
      }
      else {
        await deleteTasks(yesterday)
      }
      await setTasks(today, tasks)
    }
  }
  
  return tasks
}
