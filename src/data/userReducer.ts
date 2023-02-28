export const userReducer = (state, action) => {
  switch(action.type) {
    case 'set':
      state.user = action.user
      return {...state}
    case 'update':
      state.user = action.user
      return {...state}
    case 'delete':
      state.user = {}
      return {...state.user}
    default:
      throw new Error('not supported')
  }
}