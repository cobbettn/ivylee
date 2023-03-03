import { useContext, useState } from "react"
import { TasksContext } from "../../data/Contexts/TasksContext/TasksContextProvider"
import { AddIcon, HStack, IconButton, Input } from "native-base"
import { Keyboard, Platform } from "react-native"
import { DateContext } from "../../data/Contexts/DateContext/DateContextProvider"
import { postData } from "../../data/http/post/postData"

const AddTask = () => {
  const today = new Date()
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
  const isEnabled = () => {
    return state.tasks.length < 6 && dateContext.state.date?.getDay() >= today.getDay()
  }
  return (
    <HStack justifyContent="center" m={5}>      
      <Input
        backgroundColor={"white"}           
        onSubmitEditing={Platform.OS === 'ios' ? Keyboard.dismiss: null}
        isDisabled={!isEnabled()} 
        value={title} 
        onChangeText={onInputChange} 
        placeholder="Add a new task" />
      <IconButton 
        disabled={title === '' || !isEnabled()} 
        onPress={addTask} 
        icon={<AddIcon  />} 
        variant={isEnabled() ?  "solid" : "outline"} 
        ml={1} />
    </HStack>
  )
}

export default AddTask