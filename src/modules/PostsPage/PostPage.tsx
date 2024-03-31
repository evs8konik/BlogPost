import React, { FC } from 'react'
import Header from '../../components/Header/Header'
import PostForm from '../../components/PostForm/PostForm'
import usePostList from '../../hooks/usePostList copy/usePostList'
import Footer from '../../components/Footer/Footer'
import PostsBlock from '../../components/PostBlock/PostsBlock'

const PostsPage: FC = () => {
  const { addPost } = usePostList()

  return (
    <>
      <Header />

      {/* <PostForm addPost={addPost} /> */}

      <PostsBlock />

      <Footer />
    </>
  )
}

export default PostsPage
