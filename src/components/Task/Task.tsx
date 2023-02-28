import { useContext, useState } from "react"
import { TasksContext } from "../../data/TasksContext/TasksContextProvider"
import { Box, CheckIcon, Checkbox, HStack, IconButton, Input, Menu, Pressable, Text, TextArea, ThreeDotsIcon, VStack } from "native-base";
import { Keyboard, Platform } from "react-native";

export const Task = ({task, index}) => {
  const [titleMode, setTitleMode] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [notesMode, setNotesMode] = useState(false)
  const [notes, setNotes] = useState(task.notes)
  const { dispatch } = useContext(TasksContext);
  const toggleEditMode = () => setTitleMode(!titleMode)
  const toggleNotesMode = () => setNotesMode(!notesMode)
  const onCompleteTask = (checked) => {
    task.completedDate = !checked ? undefined : new Date()
    dispatch({type: 'update', task: task, index: index})
  }
  const saveTask = () => {
    if (titleMode) {
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
    <Box shadow={2} p={4} width={Platform.OS === 'web' ? '35vw' : null}  borderRadius="md" backgroundColor={task.completedDate === undefined ? 'white' : 'gray.300'}>
      <HStack alignItems="center">
        <VStack width={'80%'}>
          <Checkbox 
            mr={2} 
            isChecked={task.completedDate !== undefined} 
            onChange={onCompleteTask} 
            value="completed" 
            accessibilityLabel="completed">
            {
              titleMode ? 
                <Input 
                  onSubmitEditing={Platform.OS === 'ios' ? Keyboard.dismiss: null} 
                  backgroundColor="white" 
                  onChangeText={text => setTitle(text)} 
                  value={title}></Input> :
                <Text>{task.title}</Text> 
            }
          </Checkbox>
          { notesMode &&
            <Box mt={2}>
              {
                notes && <Text>Notes:</Text>
              }
              <TextArea 
                w="100%"
                value={notes}
                onSubmitEditing={Platform.OS === 'ios' ? Keyboard.dismiss: null}
                backgroundColor="white"
                placeholder="Add notes" 
                onChangeText={text => setNotes(text)}
                autoCompleteType={''} // https://github.com/GeekyAnts/NativeBase/issues/5438
                /> 
            </Box>
          }
        </VStack>
        <Box ml="auto">
          {
            titleMode || notesMode ? 
              <IconButton variant="outline" onPress={saveTask} icon={<CheckIcon />} /> 
              :
              <Menu w="175" trigger={triggerProps => (
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
    </Box>
  )
}