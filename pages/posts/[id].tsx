import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { addComment, getPost, removePost } from '../../redux/actions/postActions';
import { Button } from '../../components/Button';
import { IState, IComment } from '../../redux/types';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #daffed;

  .heading,
  .title {
    margin-top: 20px;
  }

  .text {
    max-width: 600px;
    margin: 20px 0;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    width: 200px;
  }

  .button {
    margin-bottom: 0;
  }

  .link {
    text-decoration: none;
    font-weight: bold;
    color: white;
  }

  .add-comment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    margin: 30px 0;
  }

  .comment {
    width: 300px;
    margin-bottom: 10px;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 5px;
    background: #9bf3f0;
  }
`;

const Post = (): ReactElement => {
  const [comment, setComment] = useState<string>('');
  const dispatch = useDispatch();
  const post = useSelector((state: IState) => state.post.post);
  const router = useRouter();
  const postId = router.query.id;

  useEffect(() => {
    dispatch(getPost(postId as string));
  }, []);

  const onSubmit = () => {
    const newComment = {
      postId: post.id,
      body: comment,
    };
    dispatch(addComment(newComment as IComment));
    setComment('');
  };

  const onRemove = (id: number) => {
    dispatch(removePost(String(id)));
  };

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <Container>
      <h1 className="heading">Post page</h1>
      <h2 className="title">{post.title}</h2>
      <div className="text">{post.body}</div>
      <div className="buttons">
        <Button>
          <Link href={`/posts/update/[id]`} as={`/posts/update/${post.id}`}>
            <a className="link">Update</a>
          </Link>
        </Button>
        <Button>
          <Link href="/">
            <a className="link" onClick={() => onRemove(post.id)}>
              Delete
            </a>
          </Link>
        </Button>
      </div>
      <div className="add-comment">
        <label>Post a comment</label>
        <input type="text" value={comment} onChange={onChangeComment} />
        <Button className="button" onClick={onSubmit}>
          Send
        </Button>
      </div>
      <div>
        {post.comments &&
          post.comments.length > 0 &&
          post.comments.map((comment: IComment) => (
            <div className="comment" key={comment.id}>
              {comment.body}
            </div>
          ))}
      </div>
      <Link href="/">
        <a>Back to main page</a>
      </Link>
    </Container>
  );
};

export default Post;
