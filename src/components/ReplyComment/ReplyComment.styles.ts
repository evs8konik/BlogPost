import styled from 'styled-components'

const Wrapper = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  /* margin-bottom: 20px;
  margin: 10px; */
  border-radius: 15px;
  gap: 10px;
  background-color: #e1e1e1;
`

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  text-align: justify;
`

const Username = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-style: italic;
  text-transform: capitalize;
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const StyledReplyComment = {
  Wrapper,
  ButtonWrapper,
  Username,
  Content,
}

export default StyledReplyComment
