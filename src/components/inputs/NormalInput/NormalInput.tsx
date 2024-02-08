import { ChangeEvent, FC } from 'react'
import Styled from './NormalInput.styles'

interface IProps {
  label: string
  value: string
  onChange: (value: string) => void
}

const NormalInput: FC<IProps> = ({ label, value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value)
  }

  return (
    <Styled.Wrapper>
      <Styled.Label>{label}</Styled.Label>

      <Styled.Input
        placeholder={'Enter text'}
        required
        type="text"
        value={value}
        onChange={handleChange}
      ></Styled.Input>
    </Styled.Wrapper>
  )
}

export default NormalInput
