import { useContext, useState } from "react"
import { TasksContext } from "../../data/TasksContext/tasksContextProvider"
import AddTask from "../../components/AddTask/AddTask"
import { Task } from "../../components/Task/Task"
import { Center, Text, VStack, Box } from "native-base"
import { View } from "react-native"

const Tasks = () => {
  const {state} = useContext(TasksContext)
  const [date, setDate] = useState(new Date())
  return (
    <View>
      <Center>
        <VStack>
          <Text pt={5} textAlign={"center"}>Tasks remaining for {date.toDateString()}:</Text>
          <AddTask />
          {
            state.tasks.map((task, index) => (
              <Box key={index} p={1}>
                <Task {...{task, index}}/>
              </Box>
            ))
          }
        </VStack>
      </Center>
    </View>
  )
}

export default Tasks