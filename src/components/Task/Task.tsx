import { useContext, useState } from "react"
import { TasksContext } from "../../data/TasksContext/TasksContextProvider"
import { Box, Card, CheckIcon, Checkbox, HStack, IconButton, Input, Menu, Pressable, Text, TextArea, ThreeDotsIcon, VStack } from "native-base";

export const Task = ({task, index}) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [notesMode, setNotesMode] = useState(false)
  const [notes, setNotes] = useState(task.notes)
  const { dispatch } = useContext(TasksContext);
  const onCompleteTask = (checked) => {
    task.completedDate = !checked ? undefined : new Date()
    dispatch({type: 'update', task: task, index: index})
  }
  const toggleEditMode = () => setEditMode(!editMode)
  const toggleNotesMode = () => setNotesMode(!notesMode)
  const onEditTitle = (event) => {
    setTitle(event.target.value)
  }
  const saveTask = () => {
    if (editMode) {
      dispatch({type: 'update', index, task: {...task, title}})
      toggleEditMode()
    }
    if (notesMode) {
      dispatch({type: 'update', index, task: {...task, notes}})
      toggleNotesMode()
    }
  }
  const deleteTask = () => {
    dispatch({type: 'delete', index})
  }
  return (
    <Card width={"33vw"} backgroundColor={task.completedDate === undefined ? 'white' : 'gray.300'}>
      <HStack alignItems="center">
        <VStack>
          <Checkbox mr={2} isChecked={task.completedDate !== undefined} 
            onChange={onCompleteTask} 
            value="completed" 
            accessibilityLabel="completed">
            {
              editMode ? 
                <Input backgroundColor="white" onChange={onEditTitle} value={title}></Input> :
                <Text>{task.title}</Text> 
            }
          </Checkbox>
          { notesMode &&
          <Box mt={2}>
            {
              notes && <Text>Notes:</Text>
            }
            <TextArea value={notes}
              backgroundColor="white"
              placeholder="Add notes" 
              autoCompleteType={''} // https://github.com/GeekyAnts/NativeBase/issues/5438
              onChange={e => setNotes(e.currentTarget.value)} // for web
              onChangeText={text => setNotes(text)} // for android and ios
              w="75%" 
              maxW="300" />
          </Box>
          }
        </VStack>
        <Box ml="auto">
          {
            editMode || notesMode ?
              <IconButton onPress={saveTask} icon={<CheckIcon />} /> :
              <Menu w="190" trigger={triggerProps => (
                <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                  <ThreeDotsIcon />
                </Pressable>
              )}>
                <Menu.Item onPress={toggleEditMode}>Edit</Menu.Item>
                <Menu.Item onPress={toggleNotesMode}>Notes</Menu.Item>     
                <Menu.Item onPress={deleteTask}>Delete</Menu.Item>       
              </Menu>
          }
        </Box>
      </HStack>
    </Card>
  )
}