import { useContext, useEffect, useState } from "react"
import { TasksContext } from "../../data/Contexts/TasksContext/TasksContextProvider"
import AddTask from "../../components/AddTask/AddTask"
import { Task } from "../../components/Task/Task"
import { Center, Box } from "native-base"
import { Platform, View } from "react-native"
import DateControl from "../../components/DateControl/DateControl"
import { DateContext } from "../../data/Contexts/DateContext/DateContextProvider"

const Tasks = () => {
  const tasksContext = useContext(TasksContext)
  const dateContext = useContext(DateContext)
  const { state, dispatch } = tasksContext
  const { date } = dateContext.state
  useEffect(() =>{
    fetch(`http://localhost:3001/tasks?date=${date.toDateString()}`)
      .then(res => res.status === 200 ? res.json() : [])
      .then(result =>  dispatch({type: 'set', tasks: result}))
  }, [date])
  return (
    <View>
      <Box backgroundColor="gray.100" h={Platform.OS === "web" ? "100vh" : "100%"}>
        <Center mt={Platform.OS === 'ios' ? 20 : null}>
          <AddTask />
          <DateControl />
          {
            state.tasks?.map((task, index) => (
              <Box key={task.id} p={1}>
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