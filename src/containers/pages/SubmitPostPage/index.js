import React, { useState } from 'react';
import { connect } from 'react-redux';
import PageContentLayout from '../../../components/Layout/PageContent';
import { Box, Heading, Text } from '@chakra-ui/react';
import NavBar from '../../organisms/NavBar';
import NewPostForm from '../../../components/Posts/NewPostForm';

export const SubmitPostPage = (props) => {
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <>
      <NavBar />
      <PageContentLayout maxWidth="1060px">
        <>
          <Box p="14px 0px" borderBottom="1px solid" borderColor="white" paddingTop={62}>
            <Heading fontWeight={600}>{isUpdating ? 'Update Post' : 'Tambah Post'}</Heading>
          </Box>
          <NewPostForm isUpdating={isUpdating} setIsUpdating={setIsUpdating} />
        </>
        <>
          {/* <About /> */}
        </>
      </PageContentLayout>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPostPage);
