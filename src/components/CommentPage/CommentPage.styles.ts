import styled from 'styled-components'

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 30px;
`

const Title = styled.div`
  width: 100%;

  display: flex;
  justify-content: start;

  font-size: 25px;
  font-weight: bold;
`

const CommentWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column-reverse;

  gap: 20px;
`

// const Background = styled.div`
//   position: fixed;
//   pointer-events: none;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 1;
//   display: flex;
//   justify-content: center;
//   align-items: end;
// `

// const CommentFormDiv = styled.div`
//   z-index: 2;
// `

const StyledCommentPage = {
  Wrapper,
  Title,
  CommentWrapper,
}

export default StyledCommentPage
