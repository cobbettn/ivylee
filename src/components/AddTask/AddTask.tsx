import { useContext, useState } from "react"
import { TasksContext } from "../../data/Contexts/TasksContext/TasksContextProvider"
import { AddIcon, HStack, IconButton, Input } from "native-base"
import { Keyboard, Platform } from "react-native"
import { DateContext } from "../../data/Contexts/DateContext/DateContextProvider"
import { postData } from "../../data/http/post/postData"

const AddTask = () => {
  const today = new Date()
  const MAX_TASKS = 6;
  const [title, setTitle] = useState('')
  const {state, dispatch} = useContext(TasksContext)
  const dateContext = useContext(DateContext)
  const onInputChange = text => {
    setTitle(text)
  }
  const addTask = () => {
    postData( 
      {
        title, 
        date: dateContext.state.date.toDateString()
      })
      .then(result => dispatch({type: 'add', task: {...result}}))
    setTitle('')
  }
  const isDisabled = () => {
    console.log(today, dateContext.state.date)
    const dsToday = today.toDateString()
    const dsCurrentTasks = dateContext.state.date.toDateString()
    return state.tasks.length === MAX_TASKS || new Date(dsToday) > new Date(dsCurrentTasks)
  }
  return (
    <HStack justifyContent="center" m={5}>      
      <Input
        size={"md"}
        width="80%"
        backgroundColor={"white"}           
        onSubmitEditing={Platform.OS === 'ios' ? Keyboard.dismiss: null}
        isDisabled={isDisabled()} 
        value={title} 
        onChangeText={onInputChange} 
        placeholder="Add a new task" />
      <IconButton
        size={"md"}
        disabled={isDisabled() || title.trim() === ''} 
        onPress={addTask} 
        icon={<AddIcon />} 
        variant={ isDisabled() ? "outline" : "solid"} 
        ml={1} />
    </HStack>
  )
}

export default AddTask