import React, { FC } from 'react'
import Styled from './CommentPage.styles'
import Header from '../Header/Header'
import ContentBlock from '../ContentBlock/ContentBlock'
import CommentForm from '../CommentForm/CommentForm'
import useCommentList from '../../hooks/useCommentList/useCommentList'

const CommentPage: FC = () => {
  const { addComment } = useCommentList()

  return (
    <>
      <Header />

      <CommentForm addComment={addComment} />

      <ContentBlock />
    </>
  )
}

export default CommentPage
