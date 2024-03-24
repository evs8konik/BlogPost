import React, { FC, useState, useEffect } from 'react'
import Styled from './ContentBlock.styles'
import useCommentList from '../../hooks/useCommentList/useCommentList'
import Comment from '../Comment/Comment'
import Select, { ISelectOption } from '../../modules/common/components/Select/Select'
import ButtonNormal from '../buttons/ButtonNormal/ButtonNormal'

const selectOptionsList: ISelectOption[] = [
  { label: 'Sort by new', value: 'new' },
  { label: 'Sort by old', value: 'old' },
  { label: 'Sort by Title', value: 'title' },
  { label: 'Sort none', value: 'Sort none' },
]

const COMMENTS_IN_PAGE = 2

interface IProps {
  postId: string
}

const ContentBlock: FC<IProps> = ({ postId }) => {
  const { commentList, handleSaveComment, handleClickRemoveButton } = useCommentList()
  const [selectedOption, setSelectedOption] = useState<ISelectOption>({ label: 'Sort none', value: 'Sort none' })
  const [sortedComments, setSortedComments] = useState([...commentList])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (selectedOption.value === 'new') {
      setSortedComments(
        [...commentList].sort((a, b) => {
          const dateA = new Date(a.date.year, a.date.month, a.date.dayOfMonth, a.time.hours, a.time.minutes).getTime()
          const dateB = new Date(b.date.year, b.date.month, b.date.dayOfMonth, b.time.hours, b.time.minutes).getTime()
          return dateA - dateB
        }),
      )
    } else if (selectedOption.value === 'old') {
      setSortedComments(
        [...commentList].sort((a, b) => {
          const dateA = new Date(a.date.year, a.date.month, a.date.dayOfMonth, a.time.hours, a.time.minutes).getTime()
          const dateB = new Date(b.date.year, b.date.month, b.date.dayOfMonth, b.time.hours, b.time.minutes).getTime()
          return dateB - dateA
        }),
      )
    } else if (selectedOption.value === 'title') {
      setSortedComments([...commentList].sort((a, b) => a.title.localeCompare(b.title)))
    } else {
      setSortedComments([...commentList])
    }
  }, [selectedOption, commentList])

  const goToNextPage = () => setCurrentPage((prevPage) => prevPage + 1)
  const goToPrevPage = () => setCurrentPage((prevPage) => prevPage - 1)

  const handleClickPage = (pageNumber: number) => setCurrentPage(pageNumber)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(sortedComments.length / COMMENTS_IN_PAGE); i++) {
    pageNumbers.push(i)
  }

  const handleSelect = (value: any, option: ISelectOption) => {
    setSelectedOption(option)
  }

  return (
    <Styled.ContentBlockWrapper>
      <Styled.Wrapper>
        <Styled.WrapperTitle>
          <Styled.Title>COMMENTS</Styled.Title>

          <Select
            optionList={selectOptionsList}
            selectedOption={selectedOption}
            onSelect={handleSelect}
          />
        </Styled.WrapperTitle>

        <Styled.CommentWrapper>
          {sortedComments.slice((currentPage - 1) * COMMENTS_IN_PAGE, currentPage * COMMENTS_IN_PAGE).map((comment) => (
            <Comment
              key={comment.id}
              onClick={handleClickRemoveButton}
              onSave={handleSaveComment}
              {...comment}
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
                disabled={currentPage === Math.ceil(sortedComments.length / COMMENTS_IN_PAGE)}
              >
                Next Page
              </ButtonNormal>
            </Styled.WrapperButtons>
          </Styled.WrapperPageButtons>
        </Styled.CommentWrapper>
      </Styled.Wrapper>
    </Styled.ContentBlockWrapper>
  )
}

export default ContentBlock
