import React from 'react'
import { connect } from 'react-redux'
import PageContentLayout from '../../../components/Layout/PageContent'
import { Box, Text } from '@chakra-ui/react'
import NavBar from '../../organisms/NavBar'
import NewPostForm from '../../../components/Posts/NewPostForm'

export const SubmitPostPage = (props) => {
  return (
    <>
        <NavBar />
        <PageContentLayout maxWidth="1060px">
            <>
                <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
                    <Text fontWeight={600}>Create a post</Text>
                </Box>
                <NewPostForm />
            </>
            <>
                {/* <About /> */}
            </>
        </PageContentLayout>
    </>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPostPage)