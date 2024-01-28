import { ChangeEvent, FC } from 'react'
import { Wrapper, Input, Label } from './NormalInput.styles'

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
    <Wrapper>
      <Label>{label}</Label>

      <Input
        placeholder={'Enter text'}
        required
        type="text"
        value={value}
        onChange={handleChange}
      ></Input>
    </Wrapper>
  )
}

export default NormalInput
