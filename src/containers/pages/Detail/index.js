import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getNotesByIdFromAPI } from '../../../config/redux/action';


const Detail = (props) => {
  const { userId, noteId } = useParams();
  const { note = {} } = props;

    useEffect(() => {
        props.getSingleNote(userId, noteId);
    }, []);

  // Use the id parameter in your component logic
  // For example, fetch data based on the id or display specific details
  return (
    <div>
      <h2>Detail Page</h2>
      <p>ID: {userId}</p>
        <p>Note ID: {noteId}</p>
        {note.data ? (
            <>
                <h3>Title: {note.data.title}</h3>
                <p>Content: {note.data.content}</p>
            </>
            ) : (
            <p>Loading...</p>
        )}
    </div>
  );
}

const reduxState = (state) => ({
    userData: state.user,
    note: state.note,
});

const reduxDispatch = (dispatch) => ({
    getSingleNote: (userId, noteId) => dispatch(getNotesByIdFromAPI(userId, noteId)),
});

export default connect(reduxState, reduxDispatch)(Detail);