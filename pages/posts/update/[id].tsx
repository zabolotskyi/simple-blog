import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { getPost, updatePost } from '../../../redux/actions/postActions';
import { Button } from '../../../components/Button';
import { IPost, IState } from '../../../redux/types';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #daffed;

  .heading {
    margin: 20px 0;
  }

  .update-section {
    display: flex;
    flex-direction: column;
  }

  .title-input {
    width: 400px;
    margin-bottom: 20px;
    padding: 4px;
    border: 1px solid grey;
    border-radius: 5px;
    background: #9bf3f0;
  }

  .text-input {
    width: 400px;
    min-height: 100px;
    resize: none;
    margin-bottom: 20px;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 10px;
    background: #9bf3f0;
  }

  .link {
    margin: 0 auto 20px;
  }
`;

const PostUpdate = (): ReactElement => {
  const post = useSelector((state: IState) => state.post.post);

  const [updatedPost, setUpdatedPost] = useState({
    title: post.title,
    body: post.body,
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const postId = router.query.id;

  useEffect(() => {
    dispatch(getPost(postId as string));
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setUpdatedPost({
      ...updatedPost,
      [e.target.name]: e.target.value,
    });

  const onSubmit = () => {
    dispatch(updatePost(Number(postId as string), updatedPost as IPost));
    router.push('/');
  };

  return (
    <Container>
      <h1 className="heading">Update post</h1>
      <div className="update-section">
        <input name="title" className="title-input" placeholder="Title..." onChange={onChange} />
        <textarea name="body" className="text-input" placeholder="Your news..." onChange={onChange} />
      </div>
      <Button onClick={onSubmit}>Send</Button>
      <div className="link">
        <Link href="/">
          <a>Back to main page</a>
        </Link>
      </div>
    </Container>
  );
};

export default PostUpdate;
