import { Flex, useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { connect } from 'react-redux';
import TabItem from './TabItem';
import TextInputs from './TextInputs';
import ImageUpload from './ImageUpload';
import { addDataToAPI } from '../../config/redux/action';

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images",
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
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = useState('');
  const selectFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();
  const [imageShown, setImageShown] = useState('');

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
      commentCount: 0
    };
    // console.log("DATA : " + JSON.stringify(data))

    props.savePosts(data);
    toast({
      title: "Post sudah dibuat!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 3000
    });
    setTextInputs({
      title: "",
      body: "",
    });
    setSelectedFile('');
    setImageShown('');
    setLoading(false);
  }

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

  return (
    <Flex direction='column' bg='white' borderRadius={4} mt={2}>
      <Flex width='100%'>
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
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            onChange={onTextChange}
            handleCreatePost={handleCreatePost}
            loading={loading}
          />
        )}
        {selectedTab === "Images" && (
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
  )
}

const reduxState = (state) => ({

});

const reduxDispatch = (dispatch) => ({
  savePosts: (data) => dispatch(addDataToAPI(data)),
});

export default connect(reduxState, reduxDispatch)(NewPostForm)