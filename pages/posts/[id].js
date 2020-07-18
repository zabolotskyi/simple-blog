import * as axios from 'axios';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #DAFFED;

  .text {
    max-width: 600px;
    margin-bottom: 25px;
  }

  .comment {
    width: 300px;
    margin-bottom: 10px;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 5px;
    background: #9BF3F0;
  }
`;

const Post = ({ post }) => (
  <Container>
    <h1>Post page</h1>
    <h2>{post.title}</h2>
    <div className="text">{post.body}</div>
    <div>
      {post.comments.map(comment => (
        <div className="comment" key={comment.id}>{comment.body}</div>
      ))}
    </div>
    <Link href="/">
      <a>Back to main page</a>
    </Link>
  </Container>
);

export async function getServerSideProps(context) {
  const pageId = context.params.id;
  const res = await axios.get(`https://simple-blog-api.crew.red/posts/${pageId}?_embed=comments`);
  const post = res.data;

  return { props: { post } }
}

export default Post;
