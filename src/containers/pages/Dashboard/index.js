import React, { Component, Fragment } from 'react';
import './Dashboard.scss';
import { connect } from 'react-redux';
import Button from '../../../components/atoms/Button';
import { addDataToAPI, deleteDataAPI, getDataFromAPI, updateDataAPI, logoutUser } from '../../../config/redux/action';
import { useNavigate } from 'react-router-dom';

class Dashboard extends Component {
    state = {
        title: '',
        content: '',
        date: '',
        textButton: 'SIMPAN',
        noteId: '',
    };

    componentDidMount() {
        this.props.getNotes();
    }

    handleSaveNotes = () => {
        const { title, content, textButton, noteId } = this.state;
        const { saveNotes, updateNotes } = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'));

        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid,
        };

        if (textButton === 'SIMPAN') {
            saveNotes(data);
        } else {
            data.noteId = noteId;
            updateNotes(data);
        }
        console.log(data);
    };

    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value,
        });
    };

    updateNotes = (note) => {
        console.log(note);
        this.setState({
            title: note.data.title,
            content: note.data.content,
            textButton: 'UPDATE',
            noteId: note.id,
        });
    };

    cancelUpdate = () => {
        this.setState({
            title: '',
            content: '',
            textButton: 'SIMPAN',
        });
    };

    deleteNote = (e, note) => {
        e.stopPropagation();
        const { deleteNote } = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'));
        const data = {
            userId: userData.uid,
            noteId: note.id,
        };
        deleteNote(data);
    };

    handleSignOut = () => {
        const { logoutUser } = this.props;
        logoutUser();
        const navigate = useNavigate();
        navigate('/login');
    };

    render() {
        const { title, content, textButton, noteId } = this.state;
        const { notes } = this.props;
        const { onInputChange, handleSaveNotes, updateNotes, cancelUpdate, deleteNote, handleSignOut } = this;

        return (
            <div className="container">
                <div className="input-form">
                    <input placeholder="title" className="input-title" value={title} onChange={(e) => onInputChange(e, 'title')} />
                    <textarea placeholder="content" className="input-content" value={content} onChange={(e) => onInputChange(e, 'content')}></textarea>
                    <div className="action-wrapper">
                        {textButton === 'UPDATE' ? <button className="save-btn cancel" onClick={cancelUpdate}>Cancel</button> : null}
                        <button className="save-btn" onClick={handleSaveNotes}>{textButton}</button>
                    </div>
                </div>
                <hr />
                {notes.length > 0 ? (
                    <Fragment>
                        {notes.map((note) => (
                            <div className="card-content" key={note.id} onClick={() => updateNotes(note)}>
                                <p className="title">{
                                    note.data.title}</p>
                                <p className="date">{note.data.date}</p>
                                <p className="content">{note.data.content}</p>
                                <div className="delete-btn" onClick={(e) => deleteNote(e, note)}>X</div>
                            </div>
                        ))}
                    </Fragment>
                ) : null}
                <Button onClick={handleSignOut} title="Sign Out" />
            </div>
        );
    }
}

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: () => dispatch(getDataFromAPI()),
    updateNotes: (data) => dispatch(updateDataAPI(data)),
    deleteNote: (data) => dispatch(deleteDataAPI(data)),
    logoutUser: () => dispatch(logoutUser()),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
