
import * as axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #DAFFED;

  .header {
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

  .footer {
    margin: 50px 0 15px;
  }
`;

const PostWrapper = styled.div`
  width: 300px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid silver;
  border-radius: 5px;
  background: #9BF3F0;

  .post-link {
    text-decoration: none;
    color: #4A0D67;
  }
`;

const Post = props => (
  <PostWrapper>
    <Link href="/posts/[id]" as={`posts/${props.id}`}>
      <a className="post-link">{props.title}</a>
    </Link>
  </PostWrapper>
);

const Posts = ({ data }) => (
  <Container>
    <Head>
      <title>Personal Blog</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="header">Latest posts</h1>
      <div className="create-post">
        <Link href="/posts/new">
          <a className="create-post-link">CREATE A POST</a>
        </Link>
      </div>
      {data.map(({ id, title }) => title && (
        <Post key={id} id={id} title={title} />
      ))}
    </main>

    <footer className="footer">
      Developed in Ukraine
    </footer>
  </Container>
);

export async function getServerSideProps() {
  const res = await axios.get(`https://simple-blog-api.crew.red/posts`);
  const data = res.data;

  return { props: { data } }
}

export default Posts;
