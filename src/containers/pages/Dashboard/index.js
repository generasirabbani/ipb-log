import React, { useState, useEffect } from 'react';
import './Dashboard.scss';
import { connect } from 'react-redux';
import { addDataToAPI, deleteDataAPI, getDataFromAPI, updateDataAPI } from '../../../config/redux/action';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Flex, FormControl, HStack, Input, Spacer, Textarea, VStack, useToast } from '@chakra-ui/react';
import NavBar from '../../organisms/NavBar';

const Dashboard = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [textButton, setTextButton] = useState('SIMPAN');
  const [noteId, setNoteId] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const { notes } = props;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    props.getNotes(userData.uid);
  }, []);

  const handleSaveNotes = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    const data = {
      title,
      content,
      date: new Date().getTime(),
      userId: userData.uid,
    };
    if (textButton === 'SIMPAN') {
      props.saveNotes(data);
      toast({
        title: "Post sudah dibuat!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 3000
      });
      setTitle('');
      setContent('');
      setNoteId('');
    } else {
      data.noteId = noteId;
      props.updateNotes(data);
    }
  };

  const onInputChange = (e, type) => {
    if (type === 'title') {
      setTitle(e.target.value);
    } else if (type === 'content') {
      setContent(e.target.value);
    }
  };

  const updateNote = (note) => {
    setTitle(note.data.title);
    setContent(note.data.content);
    setTextButton('UPDATE');
    setNoteId(note.id);
  };

  const cancelUpdate = () => {
    setTitle('');
    setContent('');
    setTextButton('SIMPAN');
    setNoteId('');
  };

  const deleteNote = (e, note) => {
    e.stopPropagation();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const data = {
      userId: userData.uid,
      noteId: note.id,
    };
    props.deleteNote(data);
  };

  return (
    <Box>
      <NavBar />
      <HStack width='100%' bg='gray.50'>
        {/* <FormControl isInvalid={isInvalid} isRequired>
          <FormLabel>Email</FormLabel>
          <Input className="input" id="email" placeholder="user@email.com" type="email"
            onChange={handleChangeText} value={email} />
          <FormLabel>Password</FormLabel>
          <Input className="input" id="password" placeholder="password" type="password"
            onChange={handleChangeText} value={password} />
            <FormErrorMessage>{props.error}</FormErrorMessage>
        </FormControl> */}
          <VStack ml='50px' mr='200px'>
            <FormControl mb='10px'>
              <Input placeholder="title" className="input-title" value={title} onChange={(e) => onInputChange(e, 'title')} />
              <Textarea mt='20px' placeholder="content" className="input-content" value={content} onChange={(e) => onInputChange(e, 'content')}></Textarea>
            </FormControl>
            <div className="action-wrapper">
              <HStack>
                {textButton === 'UPDATE' ? (<Button className="save-btn cancel" onClick={cancelUpdate}>Cancel</Button>) : null}
                <Spacer />
                <Button className="save-btn" onClick={handleSaveNotes}>{textButton}</Button>
              </HStack>
            </div>
          </VStack>
          <VStack>
            {notes.length > 0 ? (
              <React.Fragment>
                {notes.map((note) => (
                    <Container w='500px' className='card-content notes' key={note.id} onClick={() => updateNote(note)}>
                      <p className="title">{note.data.title}</p>
                      <p className="date">{note.data.date}</p>
                      <p className="content">{note.data.content}</p>
                      <div className="delete-btn" onClick={(e) => deleteNote(e, note)}>X</div>
                    </Container>
                ))}
              </React.Fragment>
            ) : null}
          </VStack>
      </HStack>
    </Box>
  );
};

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(updateDataAPI(data)),
    deleteNote: (data) => dispatch(deleteDataAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
