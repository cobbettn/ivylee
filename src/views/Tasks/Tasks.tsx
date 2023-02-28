import { useContext } from "react"
import { TasksContext } from "../../data/TasksContext/TasksContextProvider"
import AddTask from "../../components/AddTask/AddTask"
import { Task } from "../../components/Task/Task"
import { Center, Text, VStack, Box } from "native-base"
import { Platform, View } from "react-native"

const Tasks = () => {
  const {state} = useContext(TasksContext)
  const date = new Date();
  return (
    <View>
        <VStack>
          <Center mt={Platform.OS === 'ios' ? 20 : null}>
            <AddTask />
            <Text mb={5} textAlign={"center"}>Tasks for {date.toDateString()}:</Text>
            {
              state.tasks.map((task, index) => (
                <Box key={index} p={1}>
                  <Task {...{task, index}}/>
                </Box>
              ))
            }
          </Center>
        </VStack>
    </View>
  )
}

export default Tasks