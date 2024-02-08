import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const TextArea = styled.textarea`
  height: 90px;
  width: 100%;
  border: 2px solid #e1e1e1;
  padding: 4px 6px;
  border-radius: 6px;
`

const Span = styled.span`
  font-size: 15px;
  font-weight: bold;
`

const StyledTextArea = {
  Wrapper,
  TextArea,
  Span,
}

export default StyledTextArea
