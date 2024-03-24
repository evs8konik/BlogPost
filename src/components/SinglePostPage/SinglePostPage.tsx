import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IPost } from '../../modules/common/models/Post/Post'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Post from '../Post/Post'
import useCommentList from '../../hooks/useCommentList/useCommentList'
import CommentForm from '../CommentForm/CommentForm'
import ContentBlock from '../ContentBlock/ContentBlock'
import usePostList from '../../hooks/usePostList copy/usePostList'

const SinglePostPage: FC = () => {
  const { postId } = useParams<{ postId?: string }>()

  const { addComment } = useCommentList()

  const { postByUserId, handleSavePost, handleClickRemoveButton } = usePostList()
  const [post, setPost] = useState<IPost>()

  console.log('POST_ID', postId)

  // useEffect(() => {
  //   const foundPost = postList.find((post) => post.id === postId)

  //   setPost(foundPost)
  // }, [postId, postList])

  return (
    <>
      {post && (
        <>
          <Header />

          <Post
            key={post.id}
            onClick={handleClickRemoveButton}
            onSave={handleSavePost}
            onClickPost={() => post.id}
            prevVersion={true}
            {...post}
          />

          {postId && <CommentForm addComment={(comment) => addComment(postId, comment)} />}

          {postId && <ContentBlock postId={postId} />}
        </>
      )}

      <Footer />
    </>
  )
}

export default SinglePostPage
