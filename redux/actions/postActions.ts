import axios, { AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { GET_ALL_POSTS, GET_POST, ADD_POST, ADD_COMMENT, UPDATE_POST, REMOVE_POST } from '../consts';
import { IComment, IPost } from '../types';

const api = 'https://simple-blog-api.crew.red';

export const getAllPosts = (): ThunkAction<
  Promise<void>,
  Record<string, unknown>,
  Record<string, unknown>,
  AnyAction
> => async (dispatch: ThunkDispatch<Record<string, unknown>, Record<string, unknown>, AnyAction>): Promise<void> => {
  return new Promise<void>(async () => {
    const res: AxiosResponse<IPost[]> = await axios.get(`${api}/posts`);

    dispatch({
      type: GET_ALL_POSTS,
      payload: res.data,
    });
  });
};

export const getPost = (
  id: string,
): ThunkAction<Promise<void>, Record<string, unknown>, Record<string, unknown>, AnyAction> => async (
  dispatch: ThunkDispatch<Record<string, unknown>, Record<string, unknown>, AnyAction>,
): Promise<void> => {
  return new Promise<void>(async () => {
    const res = await axios.get(`${api}/posts/${id}?_embed=comments`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  });
};

export const addPost = (
  post: IPost,
): ThunkAction<Promise<void>, Record<string, unknown>, Record<string, unknown>, AnyAction> => async (
  dispatch: ThunkDispatch<Record<string, unknown>, Record<string, unknown>, AnyAction>,
): Promise<void> => {
  return new Promise<void>(async () => {
    const res = await axios.post(`${api}/posts`, post);

    dispatch({ type: ADD_POST, payload: res.data });
  });
};

export const addComment = (
  comment: IComment,
): ThunkAction<Promise<void>, Record<string, unknown>, Record<string, unknown>, AnyAction> => async (
  dispatch: ThunkDispatch<Record<string, unknown>, Record<string, unknown>, AnyAction>,
): Promise<void> => {
  return new Promise<void>(async () => {
    const res = await axios.post(`${api}/comments`, comment);

    dispatch({ type: ADD_COMMENT, payload: res.data });
  });
};

export const updatePost = (
  id: number,
  post: IPost,
): ThunkAction<Promise<void>, Record<string, unknown>, Record<string, unknown>, AnyAction> => async (
  dispatch: ThunkDispatch<Record<string, unknown>, Record<string, unknown>, AnyAction>,
): Promise<void> => {
  return new Promise<void>(async () => {
    const res = await axios.put(`${api}/posts/${id}`, post);

    dispatch({ type: UPDATE_POST, payload: res.data });
  });
};

export const removePost = (
  id: string,
): ThunkAction<Promise<void>, Record<string, unknown>, Record<string, unknown>, AnyAction> => async (
  dispatch: ThunkDispatch<Record<string, unknown>, Record<string, unknown>, AnyAction>,
): Promise<void> => {
  return new Promise<void>(async () => {
    await axios.delete(`${api}/posts/${id}`);

    dispatch({
      type: REMOVE_POST,
      payload: id,
    });
  });
};
