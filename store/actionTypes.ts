interface IPromiseAction<T = string, P = object> {
  readonly type: T;
  readonly payload: P;
}

interface IPostsResponse {}

export enum PostsActionTypeKeys {
  LOAD_ALL_POSTS = 'LOAD_ALL_POSTS',
  LOAD_ALL_POSTS_FULFILLED = 'LOAD_ALL_POSTS_FULFILLED',
  SEND_POST = 'SEND_POST'
}

export interface ILoadAllPostsActionType
  extends IPromiseAction<PostsActionTypeKeys.LOAD_ALL_POSTS, Promise<IPostsResponse>> {}

export interface ILoadAllPostsFulfilledActionType
  extends IPromiseAction<PostsActionTypeKeys.LOAD_ALL_POSTS_FULFILLED, IPostsResponse> {}

export interface ISendPostActionType {
  readonly title: string;
  readonly body: string;
  readonly type: PostsActionTypeKeys.SEND_POST;
}

export type IPostsActionsTypes =
  | ILoadAllPostsActionType
  | ILoadAllPostsFulfilledActionType
  | ISendPostActionType;
