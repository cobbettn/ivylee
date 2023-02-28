import { NativeBaseProvider } from "native-base";
import { TasksContextProvider } from "./src/data/TasksContext/tasksContextProvider";
import Tasks from "./src/views/Tasks/Tasks";

export default function App() {
  return (
    <NativeBaseProvider>
      <TasksContextProvider>
        <Tasks />
      </TasksContextProvider>
    </NativeBaseProvider>
  );
}