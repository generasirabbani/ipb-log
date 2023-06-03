import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PageContentLayout from '../../../components/Layout/PageContent';
import { Box, Heading, Text } from '@chakra-ui/react';
import NavBar from '../../organisms/NavBar';
import NewPostForm from '../../../components/Posts/NewPostForm';
import { useLocation, useParams } from 'react-router-dom';
import { getPostsByIdFromAPI } from '../../../config/redux/action';

export const SubmitPostPage = (props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { userId, postId } = useParams();
  const { post = {} } = props;
  const location = useLocation();
  
  useEffect(() => {
    const isEditing = location.pathname.includes("/edit");
    setIsUpdating(isEditing);
    props.getSinglePost(userId, postId);
  }, []);

  return (
    <>
      <NavBar />
      <PageContentLayout maxWidth="1060px">
        <>
          <Box p="14px 0px" borderBottom="1px solid" borderColor="white" paddingTop={62}>
            <Heading fontWeight={600}>{isUpdating ? 'Update Post' : 'Tambah Post'}</Heading>
          </Box>
          <NewPostForm post={post} />
        </>
        <>
          {/* <About /> */}
        </>
      </PageContentLayout>
    </>
  );
};

const reduxState = (state) => ({
  post: state.post,
});

const reduxDispatch = (dispatch) => ({
  getSinglePost: (userId, postId) => dispatch(getPostsByIdFromAPI(userId, postId)),
});

export default connect(reduxState, reduxDispatch)(SubmitPostPage);
