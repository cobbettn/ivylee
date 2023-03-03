import { NativeBaseProvider } from "native-base";
import { TasksContextProvider } from "./src/data/Contexts/TasksContext/TasksContextProvider";
import Tasks from "./src/views/Tasks/Tasks";
import { DateContextProvider } from "./src/data/Contexts/DateContext/DateContextProvider";

export default function App() {
  return (
    <NativeBaseProvider>
      <DateContextProvider>
        <TasksContextProvider>
          <Tasks />
        </TasksContextProvider>
      </DateContextProvider>
    </NativeBaseProvider>
  );
}