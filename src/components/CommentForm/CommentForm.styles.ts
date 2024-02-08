import styled from 'styled-components'

const Wrapper = styled.div`
  height: auto;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  border-radius: 16px;
  background-color: white;
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
`

const StyledCommentForm = {
  Wrapper,
  Form,
  ButtonWrapper,
}

export default StyledCommentForm
