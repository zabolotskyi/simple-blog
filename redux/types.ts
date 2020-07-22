export interface IComment {
  id: number;
  postId: number;
  body: string;
}

export interface IPost {
  id: number;
  title: string;
  body: string;
  comments: IComment[];
}

export interface IState {
  post: {
    posts: IPost[];
    post: IPost;
  };
}
