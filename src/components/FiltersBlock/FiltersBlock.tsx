import React, { FC, useState, useEffect, useMemo } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import Styled from './FiltersBlock.styles'

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

const POST_IN_PAGE = 8
const MAX_DISPLAY_PAGES = 6

const FiltersBlock: FC = () => {
  // const { postByUserId, handleSavePost, handleClickRemoveButton } = usePostList()

  // const [selectedOption, setSelectedOption] = useState<ISelectOption>({ label: 'Sort none', value: 'Sort none' })
  // const [sortedPosts, setSortedPosts] = useState<IPost[]>([])
  // const [currentPage, setCurrentPage] = useState<number>(1)

  // const navigate = useNavigate()

  // const postList = useMemo(() => {
  //   return Object.values(postByUserId).reduce<IPost[]>((acc, posts) => {
  //     acc.push(...posts)
  //     return acc
  //   }, [])
  // }, [postByUserId])

  // useEffect(() => {
  //   let filteredPosts = [...postList]

  //   if (selectedOption.value === 'new') {
  //     filteredPosts.sort((a, b) => {
  //       const dateA = new Date(
  //         a.date?.year || 0,
  //         a.date?.month || 0,
  //         a.date?.dayOfMonth || 0,
  //         a.time?.hours || 0,
  //         a.time?.minutes || 0,
  //       ).getTime()
  //       const dateB = new Date(
  //         b.date?.year || 0,
  //         b.date?.month || 0,
  //         b.date?.dayOfMonth || 0,
  //         b.time?.hours || 0,
  //         b.time?.minutes || 0,
  //       ).getTime()
  //       return dateA - dateB
  //     })
  //   } else if (selectedOption.value === 'old') {
  //     filteredPosts.sort((a, b) => {
  //       const dateA = new Date(
  //         a.date?.year || 0,
  //         a.date?.month || 0,
  //         a.date?.dayOfMonth || 0,
  //         a.time?.hours || 0,
  //         a.time?.minutes || 0,
  //       ).getTime()
  //       const dateB = new Date(
  //         b.date?.year || 0,
  //         b.date?.month || 0,
  //         b.date?.dayOfMonth || 0,
  //         b.time?.hours || 0,
  //         b.time?.minutes || 0,
  //       ).getTime()
  //       return dateB - dateA
  //     })
  //   } else if (selectedOption.value === 'title') {
  //     filteredPosts.sort((a, b) => a.title.localeCompare(b.title))
  //   }

  //   setSortedPosts(filteredPosts)
  // }, [selectedOption, postList])

  // const handleSelect = (value: any, option: ISelectOption) => {
  //   setSelectedOption(option)
  // }

  // const handlePostClick = (postId: string | number) => {
  //   const postIdToString = postId.toString()

  //   navigate(generatePath(EAppRoute.Post, { postId: postIdToString }))
  // }

  // const goToNextPage = () => setCurrentPage((prevPage) => prevPage + 1)
  // const goToPrevPage = () => setCurrentPage((prevPage) => prevPage - 1)

  // const handleClickPage = (pageNumber: number) => setCurrentPage(pageNumber)

  // const totalPages = Math.ceil(sortedPosts.length / POST_IN_PAGE)
  // const startPage = Math.max(1, currentPage - Math.floor(MAX_DISPLAY_PAGES / 2))
  // const endPage = Math.min(totalPages, startPage + MAX_DISPLAY_PAGES - 1)

  // return (
  //   <Styled.PostBlockWrapper>
  //     <Styled.Wrapper>
  //       <Styled.WrapperTitle>
  //         <Styled.Title>POSTS</Styled.Title>
  //         <Select
  //           optionList={selectOptionsList}
  //           selectedOption={selectedOption}
  //           onSelect={handleSelect}
  //         />
  //         {/* Add other filter components here */}
  //       </Styled.WrapperTitle>
  //       <Styled.PostWrapper>
  //         {sortedPosts.slice((currentPage - 1) * POST_IN_PAGE, currentPage * POST_IN_PAGE).map((post) => (
  //           <Post
  //             key={post.id}
  //             onClick={handleClickRemoveButton}
  //             onSave={handleSavePost}
  //             onClickPost={() => handlePostClick(post.id)}
  //             prevVersion={false}
  //             {...post}
  //           />
  //         ))}
  //       </Styled.PostWrapper>
  //       {sortedPosts.length > POST_IN_PAGE && (
  //         <Styled.WrapperPageButtons>
  //           <Styled.WrapperButtons>
  //             <ButtonNormal
  //               onClick={goToPrevPage}
  //               preset={'nextPrevPage'}
  //               disabled={currentPage === 1}
  //             >
  //               Previous Page
  //             </ButtonNormal>
  //             {startPage > 1 && (
  //               <>
  //                 <ButtonNormal
  //                   onClick={() => handleClickPage(1)}
  //                   preset={'numberPage'}
  //                 >
  //                   1
  //                 </ButtonNormal>
  //                 {startPage > 2 && (
  //                   <ButtonNormal
  //                     preset={'numberPage'}
  //                     disabled={true}
  //                   >
  //                     ...
  //                   </ButtonNormal>
  //                 )}
  //               </>
  //             )}
  //             {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((number) => (
  //               <ButtonNormal
  //                 key={number}
  //                 onClick={() => handleClickPage(number)}
  //                 preset={'numberPage'}
  //                 disabled={number === currentPage}
  //               >
  //                 {number}
  //               </ButtonNormal>
  //             ))}
  //             {endPage < totalPages && (
  //               <>
  //                 {endPage < totalPages - 1 && (
  //                   <ButtonNormal
  //                     preset={'numberPage'}
  //                     disabled={true}
  //                   >
  //                     ...
  //                   </ButtonNormal>
  //                 )}
  //                 <ButtonNormal
  //                   onClick={() => handleClickPage(totalPages)}
  //                   preset={'numberPage'}
  //                   disabled={currentPage === totalPages}
  //                 >
  //                   {totalPages}
  //                 </ButtonNormal>
  //               </>
  //             )}
  //             <ButtonNormal
  //               onClick={goToNextPage}
  //               preset={'nextPrevPage'}
  //               disabled={currentPage === totalPages}
  //             >
  //               Next Page
  //             </ButtonNormal>
  //           </Styled.WrapperButtons>
  //         </Styled.WrapperPageButtons>
  //       )}
  //     </Styled.Wrapper>
  //   </Styled.PostBlockWrapper>
  // )

  return <div>404 NOT FOUND</div>
}

export default FiltersBlock
