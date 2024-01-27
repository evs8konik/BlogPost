import { ChangeEvent, FC } from 'react'
import { Wrapper, TextArea, Span } from './NormalTextArea.styles'

interface IProps {
  label: string
  value: string
  onChange: (value: string) => void
}

const NormalTextArea: FC<IProps> = ({ label, value, onChange }) => {
  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    onChange(e.target.value)
  }

  return (
    <Wrapper>
      <Span>{label}</Span>

      <TextArea
        placeholder={'Enter text'}
        required
        maxLength={400}
        value={value}
        onChange={handleChangeContent}
      />
    </Wrapper>
  )
}

export default NormalTextArea
