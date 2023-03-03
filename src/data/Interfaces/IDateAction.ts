export enum DateAction {
  next = "NEXT",
  prev = "PREV",
  set = "SET"
}

export interface IDateAction {
  action: DateAction
}