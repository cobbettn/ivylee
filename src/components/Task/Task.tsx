import { useContext, useState, useEffect } from "react"
import { TasksContext } from "../../data/Contexts/TasksContext/TasksContextProvider"
import { Box, CheckIcon, Checkbox, ChevronDownIcon, ChevronRightIcon, HStack, IconButton, Input, Menu, Pressable, Text, TextArea, ThreeDotsIcon, Tooltip, VStack } from "native-base";
import { Keyboard, Platform } from "react-native";
import { deleteData } from "../../data/http/delete/deleteData";
import { putData } from "../../data/http/put/putData";

export const Task = ({task, index}) => {
  const [title, setTitle] = useState(task.title)
  const [titleMode, setTitleMode] = useState(false)
  const [notes, setNotes] = useState(task.notes)
  const [notesMode, setNotesMode] = useState(false)
  const { dispatch } = useContext(TasksContext)

  const toggleEditMode = () => setTitleMode(!titleMode)
  const toggleNotesMode = () => setNotesMode(!notesMode)
  const updateTask = () => {
    if (titleMode) toggleEditMode()
    if (notesMode) toggleNotesMode()
    putData(task.id, {...task, notes, title})
    .then((result) => {
      dispatch({type: 'update', index, task: result})
    })
  }
  const completeTask = (checked) => {
    task.completedDate = !checked ? undefined : new Date().toDateString()
    updateTask()
  }
  const deleteTask = () => {
    deleteData(task.id).then(() => {
      dispatch({type: 'delete', task})
    })
  }
  return (
    <Box
      p={4}
      shadow={2}
      width={Platform.OS === 'web' ? '35vw' : 80}
      borderRadius="md"
      backgroundColor={task.completedDate === undefined ? 'white' : 'gray.300'}>
      <HStack alignItems="center">
        <VStack w="80%">
          <HStack h={5} alignItems="center">
            <Checkbox
              mr={2}
              isChecked={task.completedDate !== undefined}
              onChange={completeTask}
              value="completed"
              accessibilityLabel="completed">
              {
                titleMode ?
                <Input
                  value={title}
                  onChangeText={text => setTitle(text)}
                  onSubmitEditing={Platform.OS === 'ios' ? Keyboard.dismiss : null}
                  backgroundColor="white" /> :

                <Text>{task.title}</Text>
              }
            </Checkbox>
            {
              task.notes  && 
              <Tooltip label={notesMode ? 'close' : 'see notes'}>
                <IconButton
                  isDisabled={titleMode}
                  onPress={toggleNotesMode}
                  size="xs"
                  mr={2}
                  icon={notesMode ? <ChevronRightIcon /> : <ChevronDownIcon />} />
              </Tooltip>
            }
          </HStack>
          {
            notesMode &&
            <Box mt={2} w={"100%"}>
              <TextArea
                value={notes}
                onChangeText={text => setNotes(text)}
                onSubmitEditing={Platform.OS === 'ios' ? Keyboard.dismiss : null}
                backgroundColor="white"
                placeholder="Add notes"
                autoCompleteType={''} // https://github.com/GeekyAnts/NativeBase/issues/5438 
                />
            </Box>
          }
        </VStack>
        <Box ml="auto">
        {
          titleMode || notesMode ?
          <Tooltip label="Save">
            <IconButton variant="outline" onPress={updateTask} icon={<CheckIcon />} />
          </Tooltip> :
          
          <Menu w="175" trigger={triggerProps => (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <ThreeDotsIcon />
            </Pressable>
          )}>
            <Menu.Item onPress={toggleEditMode}>Edit</Menu.Item>
            <Menu.Item onPress={toggleNotesMode}>Add notes</Menu.Item>
            <Menu.Item onPress={deleteTask}>Delete</Menu.Item>
          </Menu>
        }
        </Box>
      </HStack>
    </Box>
  )
}