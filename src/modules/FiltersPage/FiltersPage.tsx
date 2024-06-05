import React, { FC } from 'react'
import Header from '../../components/Header/Header'
import PostForm from '../../components/PostForm/PostForm'
import usePostList from '../../hooks/usePostList copy/usePostList'
import Footer from '../../components/Footer/Footer'
import PostsBlock from '../../components/PostBlock/PostsBlock'
import Title from '../../components/Title/Title'
import Styled from './FiltersPage.styles'
import FiltersBlock from '../../components/FiltersBlock/FiltersBlock'

const FilterPage: FC = () => {
  const { addPost } = usePostList()

  return (
    <>
      <Styled.Wrapper>
        <Header homeHeader={true} />

        <FiltersBlock />

        <Footer />
      </Styled.Wrapper>
    </>
  )
}

export default FilterPage
