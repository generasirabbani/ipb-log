import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getPostsByIdFromAPI } from '../../../config/redux/action';


const Detail = (props) => {
  const { userId, postId } = useParams();
  const { post = {} } = props;

    useEffect(() => {
        props.getSinglePost(userId, postId);
    }, []);

  // Use the id parameter in your component logic
  // For example, fetch data based on the id or display specific details
  return (
    <div>
      <h2>Detail Page</h2>
      <p>ID: {userId}</p>
        <p>post ID: {postId}</p>
        {post.data ? (
            <>
                <h3>Title: {post.data.title}</h3>
                <p>Content: {post.data.content}</p>
            </>
            ) : (
            <p>Loading...</p>
        )}
    </div>
  );
}

const reduxState = (state) => ({
    userData: state.user,
    post: state.post,
});

const reduxDispatch = (dispatch) => ({
    getSinglePost: (userId, postId) => dispatch(getPostsByIdFromAPI(userId, postId)),
});

export default connect(reduxState, reduxDispatch)(Detail);