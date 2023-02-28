import { useContext } from "react"
import { TasksContext } from "../../data/TasksContext/tasksContextProvider"
import { Card, Checkbox, HStack } from "native-base";
import { Text } from "react-native";

export const Task = ({task, index}) => {
  const { dispatch } = useContext(TasksContext);
  const onCompleteTask = (checked) => {
    task.completedDate = !checked ? undefined : new Date()
    dispatch({type: 'update', task: task, index: index})
  }
  return (
    <Card backgroundColor={task.completedDate === undefined ? 'white' : 'gray.300'}>
      <HStack>
        <Checkbox isChecked={task.completedDate !== undefined} 
        onChange={onCompleteTask} 
        value="completed" 
        accessibilityLabel="completed" >
          <Text>{task.title}</Text>
        </Checkbox>
      </HStack>
    </Card>
  )
}