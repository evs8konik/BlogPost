import React, { FC, useState, useEffect, useMemo } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import Styled from './PostsBlock.styles'

import Select, { ISelectOption } from '../../modules/common/components/Select/Select'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'
import usePostList from '../../hooks/usePostList copy/usePostList'
import Post from '../Post/Post'
import { EAppRoute } from '../../routes/AppRoute'
import { IPost } from '../../modules/common/models/Post/Post'

interface IPostByUserId {
  [userId: string]: IPost[]
}

const selectOptionsList: ISelectOption[] = [
  { label: 'Sort by new', value: 'new' },
  { label: 'Sort by old', value: 'old' },
  { label: 'Sort by Title', value: 'title' },
  { label: 'Sort none', value: 'Sort none' },
]

const POST_IN_PAGE = 2

const PostsBlock: FC = () => {
  const { postByUserId, handleSavePost, handleClickRemoveButton } = usePostList()

  const [selectedOption, setSelectedOption] = useState<ISelectOption>({ label: 'Sort none', value: 'Sort none' })
  const [sortedPosts, setSortedPosts] = useState<IPost[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)

  const navigate = useNavigate()

  const postList = useMemo(() => {
    console.log('RENDERED')

    return Object.values(postByUserId).reduce<IPost[]>((acc, posts) => {
      acc.push(...posts)

      return acc
    }, [])
  }, [postByUserId])

  useEffect(() => {
    if (selectedOption.value === 'new') {
      setSortedPosts(
        [...postList].sort((a, b) => {
          const dateA = new Date(
            a.date?.year || 0,
            a.date?.month || 0,
            a.date?.dayOfMonth || 0,
            a.time?.hours || 0,
            a.time?.minutes || 0,
          ).getTime()
          const dateB = new Date(
            b.date?.year || 0,
            b.date?.month || 0,
            b.date?.dayOfMonth || 0,
            b.time?.hours || 0,
            b.time?.minutes || 0,
          ).getTime()
          return dateA - dateB
        }),
      )
    } else if (selectedOption.value === 'old') {
      setSortedPosts(
        [...postList].sort((a, b) => {
          const dateA = new Date(
            a.date?.year || 0,
            a.date?.month || 0,
            a.date?.dayOfMonth || 0,
            a.time?.hours || 0,
            a.time?.minutes || 0,
          ).getTime()
          const dateB = new Date(
            b.date?.year || 0,
            b.date?.month || 0,
            b.date?.dayOfMonth || 0,
            b.time?.hours || 0,
            b.time?.minutes || 0,
          ).getTime()
          return dateB - dateA
        }),
      )
    } else if (selectedOption.value === 'title') {
      setSortedPosts([...postList].sort((a, b) => a.title.localeCompare(b.title)))
    } else {
      setSortedPosts([...postList])
    }
  }, [selectedOption, postList])

  const goToNextPage = () => setCurrentPage((prevPage) => prevPage + 1)
  const goToPrevPage = () => setCurrentPage((prevPage) => prevPage - 1)

  const handleClickPage = (pageNumber: number) => setCurrentPage(pageNumber)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(sortedPosts.length / POST_IN_PAGE); i++) {
    pageNumbers.push(i)
  }

  const handleSelect = (value: any, option: ISelectOption) => {
    setSelectedOption(option)
  }

  const handlePostClick = (postId: string) => {
    navigate(generatePath(EAppRoute.Post, { postId }))
  }

  return (
    <Styled.PostBlockWrapper>
      <Styled.Wrapper>
        <Styled.WrapperTitle>
          <Styled.Title>POSTS</Styled.Title>

          <Select
            optionList={selectOptionsList}
            selectedOption={selectedOption}
            onSelect={handleSelect}
          />
        </Styled.WrapperTitle>

        <Styled.PostWrapper>
          {sortedPosts.slice((currentPage - 1) * POST_IN_PAGE, currentPage * POST_IN_PAGE).map((post) => (
            <Post
              key={post.id}
              onClick={handleClickRemoveButton}
              onSave={handleSavePost}
              onClickPost={() => handlePostClick(post.id)}
              prevVersion={true}
              {...post}
            />
          ))}

          <Styled.WrapperPageButtons>
            <Styled.WrapperButtons>
              <ButtonNormal
                onClick={goToPrevPage}
                preset={'nextPrevPage'}
                disabled={currentPage === 1}
              >
                Previous Page
              </ButtonNormal>

              {pageNumbers.map((number) => (
                <ButtonNormal
                  key={number}
                  onClick={() => handleClickPage(number)}
                  preset={'numberPage'}
                >
                  {number}
                </ButtonNormal>
              ))}

              <ButtonNormal
                onClick={goToNextPage}
                preset={'nextPrevPage'}
                disabled={currentPage === Math.ceil(sortedPosts.length / POST_IN_PAGE)}
              >
                Next Page
              </ButtonNormal>
            </Styled.WrapperButtons>
          </Styled.WrapperPageButtons>
        </Styled.PostWrapper>
      </Styled.Wrapper>
    </Styled.PostBlockWrapper>
  )
}

export default PostsBlock
