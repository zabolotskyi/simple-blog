import * as axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #DAFFED;

  .title-input {
    width: 400px;
    margin-bottom: 20px;
    padding: 4px;
    border: 1px solid grey;
    border-radius: 5px;
    background: #9BF3F0;
  }

  .text-input {
    width: 390px;
    min-height: 100px;
    resize: none;
    margin-bottom: 20px;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 10px;
    background: #9BF3F0;
  }

  .add-post {
    margin-bottom: 25px;
  }
`;

const NewPost = () => {
  const titleRef = useRef(null);
  const postRef = useRef(null);
  const router = useRouter();

  const onAddPost = () => {
    const title = titleRef.current.value;
    const body = postRef.current.value;

    axios.post('https://simple-blog-api.crew.red/posts', { title, body })
      .then(() => {
        titleRef.current.value = '';
        postRef.current.value = '';
        router.push('/');
      });
  };

  return (
    <Container>
      <h1>New post</h1>
      <h3>Create a post</h3>
      <input
        className="title-input"
        placeholder="Title..."
        ref={titleRef}
      />
      <textarea
        className="text-input"
        placeholder="Your news..."
        ref={postRef}
      />
      <button className="add-post" onClick={onAddPost}>Add a post</button>
      <Link href="/">
        <a>Back to main page</a>
      </Link>
    </Container>
  );
}

export default NewPost;
