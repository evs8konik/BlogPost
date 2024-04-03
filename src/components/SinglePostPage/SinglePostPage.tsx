import React, { FC, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IPost } from '../../modules/common/models/Post/Post'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Post from '../Post/Post'
import useCommentList from '../../hooks/useCommentList/useCommentList'
import CommentForm from '../CommentForm/CommentForm'
import usePostList from '../../hooks/usePostList copy/usePostList'
import CommentBlock from '../CommentBlock/CommentBlock'
import Styled from './SinglePostPage.styles'

const SinglePostPage: FC = () => {
  const { postId } = useParams<{ postId?: string }>()

  const { addComment } = useCommentList()

  const { postByUserId, handleSavePost, handleClickRemoveButton } = usePostList()
  const [post, setPost] = useState<IPost>()

  const postList = useMemo(() => {
    console.log('RENDERED')

    return Object.values(postByUserId).reduce<IPost[]>((acc, posts) => {
      acc.push(...posts)

      return acc
    }, [])
  }, [postByUserId])

  useEffect(() => {
    const foundPost = postList.find((post) => post.id.toString() === postId)

    setPost(foundPost)
  }, [postId, postList])

  return (
    <>
      {post && (
        <>
          <Header homeHeader={false} />

          <Styled.Wrapper>
            <Styled.PostWrapper>
              <Post
                key={post.id}
                onClick={handleClickRemoveButton}
                onSave={handleSavePost}
                onClickPost={() => post.id}
                prevVersion={true}
                {...post}
              />
            </Styled.PostWrapper>
          </Styled.Wrapper>

          {postId && (
            <CommentForm
              addComment={addComment}
              postId={postId}
            />
          )}
          {postId && <CommentBlock postId={postId} />}
        </>
      )}

      <Footer />
    </>
  )
}

export default SinglePostPage
