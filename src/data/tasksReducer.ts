export const tasksReducer = (state, action) => {
  switch(action.type) {
    case 'add':
      state.tasks = [...state.tasks, action.task]
      return {...state}
    case 'update':
      state.tasks[action.index] = action.task
      return {...state}
    case 'delete':
      state.tasks = [...state.tasks.filter((task, index) => index !== action.index)]
      return {...state}
    default:
      throw new Error('not supported')
  }
}