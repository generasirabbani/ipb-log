const initialState = {
  popup: false,
  isLogin: false,
  isLoading: false,
  user: {},
  homePosts: [],
  userPosts: [],
  post: {},
  postComments: [],
  error: '',
}

const reducer = (state=initialState, action) => {
  if(action.type === 'CHANGE_POPUP'){
    return {
      ...state,
      popup: action.value
    }
  }
  if(action.type === 'CHANGE_ISLOGIN'){
    return {
      ...state,
      isLogin: action.value
    }
  }
  if(action.type === 'CHANGE_USER'){
    return {
      ...state,
      user: action.value
    }
  }
  if(action.type === 'CHANGE_LOADING'){
    return {
      ...state,
      isLoading: action.value
    }
  }
  if(action.type === 'SET_HOME_POSTS'){
    return {
      ...state,
      homePosts: action.value
    }
  }
  if(action.type === 'SET_USER_POSTS'){
    return {
      ...state,
      userPosts: action.value
    }
  }
  if(action.type === 'SET_POST'){
    return {
      ...state,
      post: action.value
    }
  }
  if(action.type === 'SET_POST_COMMENTS'){
    return {
      ...state,
      postComments: action.value
    }
  }
  if(action.type === 'CHANGE_ERROR'){
    return {
      ...state,
      error: action.value
    }
  }
  return state
}

export default reducer;