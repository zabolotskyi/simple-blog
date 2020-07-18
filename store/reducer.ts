import { IPostsActionsTypes, PostsActionTypeKeys } from './actionTypes';

const initialState = {
  posts: []
};

const postReducer = (state = initialState, action: IPostsActionsTypes) => {
  switch (action.type) {
    case PostsActionTypeKeys.LOAD_ALL_POSTS:
      return state;

    case PostsActionTypeKeys.SEND_POST:
      return state;

    default:
      return state;
  }
};

export default postReducer;
