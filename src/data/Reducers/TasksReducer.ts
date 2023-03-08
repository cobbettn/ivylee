export const tasksReducer = (state, action) => {
  const { type, task, index, tasks } = action
  switch(type) {
    case 'set':
      state.tasks = [...tasks]
      return {...state}
    case 'add':
      state.tasks.push(task)
      return {...state}
    case 'update':
      state.tasks[index] = task
      return {...state}
    case 'delete':
      state.tasks = state.tasks.filter((t, i) => i != index)
      return {...state}
    default:
      return {...state}
  }
}