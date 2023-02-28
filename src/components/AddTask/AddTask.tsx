import { useContext, useState } from "react"
import { TasksContext } from "../../data/TasksContext/TasksContextProvider"
import { AddIcon, HStack, IconButton, Input } from "native-base"
import { Keyboard, Platform } from "react-native"

const AddTask = () => {
  const [title, setTitle] = useState('')
  const {state, dispatch} = useContext(TasksContext)
  const onInputChange = text => {
    setTitle(text)
  }
  const onButtonClick = () => {
    dispatch({
      type: 'add',
      task: {
        title,
        createdDate: new Date()
      }
    })
    setTitle('')
  }
  return (
    <HStack m={5}>      
      <Input               
        onSubmitEditing={Platform.OS === 'ios' ? Keyboard.dismiss: null}
        flexGrow={1} 
        isDisabled={state.tasks.length === 6} 
        value={title} 
        onChangeText={onInputChange} 
        placeholder="Add a task"></Input>
      <IconButton disabled={title === '' || state.tasks.length === 6} 
        onPress={onButtonClick} 
        icon={<AddIcon  />} 
        variant={"solid"} 
        ml={1}/>
    </HStack>
  )
}

export default AddTask