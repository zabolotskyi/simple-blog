import Head from 'next/head';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';

import { getAllPosts } from '../redux/actions/postActions';
import { IPost, IState } from '../redux/types';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #daffed;

  .main {
    margin-bottom: 20px;
  }

  .header {
    margin: 20px 0;
    text-align: center;
  }

  .create-post {
    padding: 10px;
    border: 1px solid silver;
    border-radius: 5px;
    background: #473198;
    text-align: center;

    .create-post-link {
      text-decoration: none;
      color: white;
      font-weight: bold;
    }
  }
`;

const PostWrapper = styled.div`
  width: 300px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid silver;
  border-radius: 5px;
  background: #9bf3f0;

  .post-link {
    text-decoration: none;
    color: #4a0d67;
  }
`;

const Post = (props: IPost) => (
  <PostWrapper>
    <Link href="/posts/[id]" as={`posts/${props.id}`}>
      <a className="post-link">{props.title}</a>
    </Link>
  </PostWrapper>
);

const Posts = (): ReactElement => {
  const dispatch = useDispatch();
  const posts = useSelector((state: IState) => state.post.posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <Container>
      <Head>
        <title>Personal Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <h1 className="header">Latest posts</h1>
        <div className="create-post">
          <Link href="/posts/new">
            <a className="create-post-link">CREATE A POST</a>
          </Link>
        </div>
        {posts.map(({ id, title, ...rest }: IPost) => title && <Post key={id} id={id} title={title} {...rest} />)}
      </main>
    </Container>
  );
};

export default Posts;
