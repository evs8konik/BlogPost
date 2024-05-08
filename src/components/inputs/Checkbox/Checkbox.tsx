import { ChangeEvent, FC } from 'react'
import Styled from './Checkbox.styles'

interface IProps {
  label?: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: FC<IProps> = ({ label, checked, onChange }) => {
  // const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   onChange(e.target.value)
  // }

  return (
    <Styled.Wrapper>
      <Styled.Label>{label}</Styled.Label>

      <Styled.Input
        placeholder={'Enter text'}
        required
        type={'checkbox'}
        checked={checked}
        onChange={onChange}
      ></Styled.Input>
    </Styled.Wrapper>
  )
}

export default Checkbox
