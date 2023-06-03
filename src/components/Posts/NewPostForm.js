import { useEffect, useRef, useState } from 'react';
import { Flex, useToast } from '@chakra-ui/react';
import { BiPoll } from 'react-icons/bi';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import TabItem from './TabItem';
import TextInputs from './TextInputs';
import ImageUpload from './ImageUpload';
import { addDataToAPI, updateDataAPI } from '../../config/redux/action';

const formTabs = [
  {
    title: 'Post',
    icon: IoDocumentText,
  },
  {
    title: 'Images',
    icon: IoImageOutline,
  },
  // {
  //   title: "Link",
  //   icon: BsLink45Deg,
  // },
  // {
  //   title: "Poll",
  //   icon: BiPoll,
  // },
  // {
  //   title: "Talk",
  //   icon: BsMic,
  // },
];

const NewPostForm = (props) => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: '',
    body: '',
  });
  const [selectedFile, setSelectedFile] = useState('');
  const selectFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [imageShown, setImageShown] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isEditing = location.pathname.includes('/edit');
    setIsUpdating(isEditing);

    if (isUpdating && props.post) {
      const { post } = props;

      setTextInputs({
        title: post.data.title,
        body: post.data.content,
      });
      setImageShown(post.data.image);
    }
  }, [location.pathname, isUpdating, props.post]);

  const handleCreatePost = () => {
    setLoading(true);
    const { title, body } = textInputs;
    const userData = JSON.parse(localStorage.getItem('userData'));

    const data = {
      title,
      content: body,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      userId: userData.uid,
      voteCount: 0,
      image: selectedFile || null,
      commentCount: 0,
    };

    props.savePost(data);

    toast({
      title: 'Post telah dibuat!',
      status: 'success',
      isClosable: true,
      position: 'top',
      duration: 3000,
    });

    setTextInputs({
      title: '',
      body: '',
    });
    setSelectedFile('');
    setImageShown('');
    setLoading(false);
    navigate('/home');
  };

  const handleUpdatePost = async () => {
    setLoading(true);
    const { title, body } = textInputs;
    const { post } = props;
    const userData = JSON.parse(localStorage.getItem('userData'));

    const updatedData = {
      title,
      content: body,
      updatedAt: new Date().getTime(),
      userId: userData.uid,
      image: selectedFile || null,
      postId: post.id,
    };

    try {
      await props.updatePost(updatedData);

      toast({
        title: 'Post berhasil diperbarui!',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 3000,
      });

      setIsUpdating(false);
      setTextInputs({
        title: '',
        body: '',
      });
      setSelectedFile('');
      setImageShown('');
      setLoading(false);
      navigate('/home');
    } catch (error) {
      console.log('Error updating post:', error);
      setLoading(false);
    }
  };

  const onSelectImage = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setImageShown(readerEvent.target?.result);
      }
    };
  };

  const onTextChange = ({ target: { name, value } }) => {
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cancelUpdatePost = () => {
    setIsUpdating(false);
    setTextInputs({
      title: '',
      body: '',
    });
    navigate('/post/' + props.post.userId + '/' + props.post.id);
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item, index) => (
          <TabItem
            key={index}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === 'Post' && (
          <TextInputs
            textInputs={textInputs}
            onChange={onTextChange}
            handleCreatePost={handleCreatePost}
            handleUpdatePost={handleUpdatePost}
            loading={loading}
            isUpdating={isUpdating}
            setIsUpdating={setIsUpdating}
            cancelUpdate={cancelUpdatePost}
          />
        )}
        {selectedTab === 'Images' && (
          <ImageUpload
            setImageShown={setImageShown}
            setSelectedTab={setSelectedTab}
            selectFileRef={selectFileRef}
            onSelectImage={onSelectImage}
            imageShown={imageShown}
          />
        )}
      </Flex>
    </Flex>
  );
};

const reduxState = (state) => ({});

const reduxDispatch = (dispatch) => ({
  savePost: (data) => dispatch(addDataToAPI(data)),
  updatePost: (data) => dispatch(updateDataAPI(data)),
});

export default connect(reduxState, reduxDispatch)(NewPostForm);
