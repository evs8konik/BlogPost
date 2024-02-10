import styled from 'styled-components'

const Wrapper = styled.div`
  width: 70%;
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

const StyledContentBlock = {
  Wrapper,
  Title,
  CommentWrapper,
}

export default StyledContentBlock
