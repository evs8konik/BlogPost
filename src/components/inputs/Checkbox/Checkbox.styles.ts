import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  gap: 4px;
`

const Input = styled.input`
  height: 30px;
  width: 100%;

  border: 2px solid #e1e1e1;
  padding: 4px 6px;
  border-radius: 6px;
`

const Label = styled.span`
  font-size: 15px;
  font-weight: bold;
`

const StyledCheckbox = {
  Wrapper,
  Input,
  Label,
}

export default StyledCheckbox
