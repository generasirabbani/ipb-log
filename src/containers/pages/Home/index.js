import React, { useEffect } from 'react';
import './Home.scss';
import { connect } from 'react-redux';
import { getAllNotesFromAPI } from '../../../config/redux/action';
import { Box } from '@chakra-ui/react';
import NavBar from '../../organisms/NavBar';

const Home = (props) => {
  const { notes = [] } = props;

  useEffect(() => {
    props.getAllNotes(); // Fetch all notes
  }, []);

  return (
    <Box>
      <NavBar />
      <div className="container">
        <div className="card-content">
          <p className="title">All posts:</p>
        </div>
        {notes.length > 0 ? (
          <React.Fragment>
            {notes.map((note) => (
              <div className="card-content notes" key={note.id}>
                <p className="title">{note.data.title}</p>
                <p className="date">{note.data.date}</p>
                <p className="content">{note.data.content}</p>
              </div>
            ))}
          </React.Fragment>
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </Box>
  );
};

const reduxState = (state) => ({
  userData: state.user,
  notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
  getAllNotes: () => dispatch(getAllNotesFromAPI()),
});

export default connect(reduxState, reduxDispatch)(Home);
