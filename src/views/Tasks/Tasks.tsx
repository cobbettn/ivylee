import { useContext, useEffect } from "react"
import { TasksContext } from "../../data/Contexts/TasksContext/TasksContextProvider"
import AddTask from "../../components/AddTask/AddTask"
import { Task } from "../../components/Task/Task"
import { Center, Box } from "native-base"
import { Platform, View } from "react-native"
import DateControl from "../../components/DateControl/DateControl"
import { DateContext } from "../../data/Contexts/DateContext/DateContextProvider"
import { getTasks, moveIncompleteTasksToToday } from "../../data/AsyncStorage/tasks"

const Tasks = () => {
  const tasksContext = useContext(TasksContext)
  const dateContext = useContext(DateContext)
  const { state, dispatch } = tasksContext
  const { date } = dateContext.state

  // when component is mounted, move any incomplete tasks from yesterday to today
  useEffect(() => {
    moveIncompleteTasksToToday()
      .then(tasks => {
        if (tasks?.length > 0) {
          dispatch({type: 'set', tasks})
        }
      })
  }, [])
  
  useEffect(() => {
    getTasks(date)
      .then(tasks => {
        dispatch({type: 'set', tasks: tasks?.length > 0 ? tasks : []})
      })
  }, [date])

  return (
    <View>
      <Box backgroundColor="gray.100" h={Platform.OS === "web" ? "100vh" : "100%"}>
        <Center mt={Platform.OS === 'ios' ? 20 : null}>
          <AddTask />
          <DateControl />
          {
            state.tasks?.map((task, index) => (
              <Box key={`${date.toDateString()}-${index}`} p={1}>
                <Task {...{task, index}}/>
              </Box>
            ))
          }
        </Center>
      </Box>
    </View>
  )
}

export default Tasks