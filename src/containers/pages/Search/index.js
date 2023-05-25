import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { searchNotesFromAPI } from '../../../config/redux/action';
import { Box } from '@chakra-ui/react';
import NavBar from '../../organisms/NavBar';

const Search = (props) => {
  const { query } = useParams();
  const { notes = [] } = props;

    useEffect(() => {
        props.getNotesByQuery(query);
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
                <a href={`/detail/${note.userId}/${note.id}`} key={note.id}>
                  <div className="card-content notes" key={note.id}>
                    <p className="title">{note.data.title}</p>
                    <p className="date">{new Date(note.data.date).toDateString()}</p>
                    <p className="content">{note.data.content}</p>
                  </div>
                </a>
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
    getNotesByQuery: (query) => dispatch(searchNotesFromAPI(query)),
  });
  
export default connect(reduxState, reduxDispatch)(Search);
  