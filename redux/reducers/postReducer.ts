import { AnyAction } from 'redux';

import { GET_ALL_POSTS, GET_POST, ADD_POST, ADD_COMMENT, UPDATE_POST, REMOVE_POST } from '../consts';
import { IPost } from '../types';

interface IPostsState {
  posts: IPost[];
  post: IPost;
}

const initialState: IPostsState = {
  posts: [],
  post: {
    id: 0,
    title: '',
    body: '',
    comments: [],
  },
};

const postReducer = (state = initialState, action: AnyAction): IPostsState => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case GET_POST:
      return {
        ...state,
        post: action.payload,
      };

    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    case ADD_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      };

    case UPDATE_POST:
      return {
        ...state,
        post: action.payload,
      };

    case REMOVE_POST:
      return {
        ...state,
        posts: [...state.posts.filter((post) => post.id !== action.payload)],
        post: {
          id: 0,
          title: '',
          body: '',
          comments: [],
        },
      };

    default:
      return state;
  }
};

export default postReducer;
