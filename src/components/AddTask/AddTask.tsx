import { useContext, useState } from "react"
import { TasksContext } from "../../data/TasksContext/TasksContextProvider"
import { AddIcon, HStack, IconButton, Input } from "native-base"

const AddTask = () => {
  const [title, setTitle] = useState('')
  const {state, dispatch} = useContext(TasksContext)
  const onInputChange = (event) => {
    setTitle(event.target.value)
  }
  const onButtonClick = () => {
    dispatch(
      {
        type: 'add',
        task: {
          title,
          createdDate: new Date()
        }
      }
    )
    setTitle('')
  }
  return (
    <HStack m={5}>      
      <Input isDisabled={state.tasks.length === 6} value={title} onChange={onInputChange} placeholder="Add a task"></Input>
      <IconButton disabled={title === '' || state.tasks.length === 6} 
        onPress={onButtonClick} 
        icon={<AddIcon  />} 
        variant={"solid"} 
        ml={1}/>
    </HStack>
  )
}

export default AddTask