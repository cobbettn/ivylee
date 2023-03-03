import { DateAction } from "../Interfaces/IDateAction"

export const DateReducer = (state, action) => {
  const { type } = action
  const { date } = state
  switch(type) {
    case DateAction.next:
      date.setDate(date.getDate() + 1)
      return {...state, date: new Date(date)}
    case DateAction.prev:
      date.setDate(date.getDate() - 1)
      return {...state, date: new Date(date)}
    case DateAction.set:
      return {...state, date: new Date(action.date)}
    default:
      return {...state}
  }
}