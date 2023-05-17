import React, {useEffect, useState} from 'react';
import './Dashboard.scss';
import {addDataToAPI, deleteDataAPI, getDataFromAPI, updateDataAPI} from '../../../config/redux/action';
import { connect } from 'react-redux';
import NavBar from '../../organisms/NavBar';

const Dashboard = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [textButton, setTextButton] = useState('SIMPAN');
    const [noteId, setNoteId] = useState('');
  
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      props.getNotes(userData.uid);
    }, []);
  
    const handleSaveNotes = () => {
      const userData = JSON.parse(localStorage.getItem('userData'));
  
      const data = {
        title: title,
        content: content,
        date: new Date().getTime(),
        userId: userData.uid
      }
  
      if (textButton === 'SIMPAN') {
        props.saveNotes(data);
      } else {
        data.noteId = noteId;
        props.updateNotes(data);
      }
      console.log(data);
    }
  
    const onInputChange = (e, type) => {
      if (type === 'title') {
        setTitle(e.target.value);
      } else if (type === 'content') {
        setContent(e.target.value);
      }
    }
  
    const updateNotes = (note) => {
      setTitle(note.data.title);
      setContent(note.data.content);
      setTextButton('UPDATE');
      setNoteId(note.id);
    }
  
    const cancelUpdate = () => {
      setTitle('');
      setContent('');
      setTextButton('SIMPAN');
    }
  
    const handleDeleteNote = (e, note) => {
      e.stopPropagation();
      const userData = JSON.parse(localStorage.getItem('userData'));
      const data = {
        userId: userData.uid,
        noteId: note.id
      }
      props.deleteNote(data);
    }
  
    const { notes } = props;
  
    return (
      <div className='container'>
        <NavBar />
        <div className='input-form'>
          <input
            placeholder='title'
            className='input-title'
            value={title}
            onChange={(e) => onInputChange(e, 'title')}
          />
          <textarea
            placeholder='content'
            className='input-content'
            value={content}
            onChange={(e) => onInputChange(e, 'content')}
          ></textarea>
          <div className='action-wrapper'>
            {textButton === 'UPDATE' ? (
              <button className='save-btn cancel' onClick={cancelUpdate}>Cancel</button>
            ) : null}
            <button className='save-btn' onClick={handleSaveNotes}>{textButton}</button>
          </div>
        </div>
        <hr />
        {notes.length > 0 ? (
          <React.Fragment>
            {notes.map((note) => (
              <div className='card-content' key={note.id} onClick={() => updateNotes(note)}>
                <p className='title'>{note.data.title}</p>
                <p className='date'>{note.data.date}</p>
                <p className='content'>{note.data.content}</p>
                <div className='delete-btn' onClick={(e) => handleDeleteNote(e, note)}>X</div>
              </div>
            ))}
          </React.Fragment>
        ) : null}
      </div>
    );
  };

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
});

const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(updateDataAPI(data)),
    deleteNote: (data) => dispatch(deleteDataAPI(data))
})

export default connect(reduxState, reduxDispatch)(Dashboard);