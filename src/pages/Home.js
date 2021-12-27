import { useState } from 'react';
import { useAddPost, useGetPosts } from '../hooks/usePosts';
// Bootstrap
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Home() {
  const { data } = useGetPosts();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const { mutate: addPost, isLoading } = useAddPost();

  const submitPost = () => {
    const post = { title, body };
    // console.log(post);
    addPost(post);
  };

  return (
    <>
      <h1>Home Page</h1>
      <p>Welcome #user! There are {data?.data.length} posts available.</p>
      <Row>
        <Col sm={6}>
          <Form>
            <fieldset className='border p-2'>
              <legend>New Post</legend>
              <Form.Group className='mb-2'>
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Post Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-2'>
                <Form.Label>Body:</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  placeholder="What's on your mind?"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </Form.Group>
              <Button
                variant='primary'
                onClick={submitPost}
                disabled={isLoading ? true : null}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </Button>
            </fieldset>
          </Form>
        </Col>
        <Col sm={6}>{/* Second Column */}</Col>
      </Row>
    </>
  );
}

export default Home;
