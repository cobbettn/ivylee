import { Box, ChevronLeftIcon, ChevronRightIcon, HStack, IconButton, Text } from "native-base"
import { useContext } from "react"
import { DateContext } from "../../data/Contexts/DateContext/DateContextProvider"
import { DateAction } from "../../data/Interfaces/IDateAction"
import { Platform } from "react-native"

const DateControl = () => {
  const {state, dispatch} = useContext(DateContext)
  const { date } = state;
  const prevDay = () => {
    dispatch({type: DateAction.prev, date})
  }
  const nextDay = () => {
    dispatch({type: DateAction.next, date})
  }
  return(
    <HStack width={Platform.OS === "web" ? "35vw" : null} p={2} mb={4}>
      <IconButton mr="auto" variant={"outline"} onPress={prevDay} icon={<ChevronLeftIcon />} ></IconButton>
      <Box justifyContent="center" p={2}>
        <Text fontSize="lg" textAlign="center">Tasks for {date.toDateString()}:</Text>
      </Box>
      <IconButton ml="auto" variant={"outline"} onPress={nextDay} icon={<ChevronRightIcon />} ></IconButton>
    </HStack> 
  )
}

export default DateControl