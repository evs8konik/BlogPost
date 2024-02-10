import React, { FC } from 'react'
import Styled from './CommentPage.styles'
import useCommentList from '../../hooks/useCommentList/useCommentList'
import Header from '../Header/Header'
import Comments from '../Comments/Comments'

const CommentPage: FC = () => {
  return (
    <>
      <Header />
      <Comments />
    </>
  )
}

export default CommentPage
