import AsyncStorage from "@react-native-async-storage/async-storage"
import { Task } from "../Types/Task"

export const setTasks = async (key: Date, value: Task[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value) // AsyncStorage can only store strings as values
    await AsyncStorage.setItem(`@${key.toDateString()}`, jsonValue)
  }
  catch (e) {
    // error handling
  }
}

export const getTasks = async (key: Date): Promise<Task[] | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key.toDateString()}`) // returns a string
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } 
  catch(e) {
    // error handling
  }
}