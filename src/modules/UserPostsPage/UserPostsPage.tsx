import React, { FC } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Styled from './UserPostsPage.styles'
import UserPostsBlock from '../../components/UserPostBlock/UserPostsBlock'

const UserPostsPage: FC = () => {
  return (
    <>
      <Styled.Wrapper>
        <Header homeHeader={true} />

        <UserPostsBlock />

        <Footer />
      </Styled.Wrapper>
    </>
  )
}

export default UserPostsPage
