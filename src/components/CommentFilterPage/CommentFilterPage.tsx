import React, { FC } from 'react'
import Styled from './CommentFilterPage.styles'
import Header from '../Header/Header'
import ContentBlock from '../ContentBlock/ContentBlock'
import CommentForm from '../CommentForm/CommentForm'
import useCommentList from '../../hooks/useCommentList/useCommentList'

const CommentFilterPage: FC = () => {
  const { addComment } = useCommentList()

  return (
    <>
      <Styled.Wrapper>
        <Styled.Header></Styled.Header>
      </Styled.Wrapper>
    </>
  )
}

export default CommentFilterPage
