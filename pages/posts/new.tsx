import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { addPost } from '../../redux/actions/postActions';
import { Button } from '../../components/Button';
import { IPost } from '../../redux/types';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #daffed;

  .heading {
    margin: 20px 0;
  }

  .title-input {
    width: 400px;
    margin-bottom: 20px;
    padding: 10px;
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
`;

const NewPost = (): ReactElement => {
  const [post, setPost] = useState({
    title: '',
    body: '',
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const onAddPost = () => {
    dispatch(addPost(post as IPost));
    router.push('/');
  };

  return (
    <Container>
      <h1 className="heading">New post</h1>
      <h3 className="heading">Create a post</h3>
      <input name="title" className="title-input" placeholder="Title..." onChange={onChange} />
      <textarea name="body" className="text-input" placeholder="Your news..." onChange={onChange} />
      <Button onClick={onAddPost}>Add a post</Button>
      <Link href="/">
        <a>Back to main page</a>
      </Link>
    </Container>
  );
};

export default NewPost;
