import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Input = styled.input`
  height: 30px;
  width: 100%;

  display: none;

  border: 2px solid #e1e1e1;
  padding: 4px 6px;
  border-radius: 6px;
`

const Label = styled.span`
  display: flex;
  justify-content: end;

  font-size: 15px;
  font-weight: bold;
`

const Img = styled.img`
  height: 30px;
  width: 30px;

  cursor: pointer;
`

const StyledInputUpload = {
  Wrapper,
  Input,
  Label,
  Img,
}

export default StyledInputUpload
