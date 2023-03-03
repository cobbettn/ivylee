export const userReducer = (state, action) => {
  switch(action.type) {
    case 'set':
      state.user = action.user
      return {...state}
    case 'update':
      state.user = action.user
      return {...state}
    default:
      throw new Error('not supported')
  }
}