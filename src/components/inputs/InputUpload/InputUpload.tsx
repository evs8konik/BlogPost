import { MouseEvent, ChangeEvent, FC, useRef } from 'react'
import Styled from './InputUpload.styles'
import { toBase64 } from '../../CommentForm/CommentForm'
import uploadPng from './assets/images/252006.png'

interface IProps {
  label?: string
  id?: string
  value?: string
  onChange: (value: string) => void
}

const InputUpload: FC<IProps> = ({ label, id, value, onChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    e.stopPropagation()
    const fileForUpload = e.currentTarget.files?.[0]

    if (!fileForUpload) return

    try {
      const base64String = await toBase64(fileForUpload)
      onChange(base64String as string)
    } catch (error) {
      console.error('Error handling file upload:', error)
    }
  }

  const handleImgClick = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation()

    inputRef.current?.click()
  }

  return (
    <Styled.Wrapper>
      <Styled.Label>
        {label}
        <Styled.Img
          onClick={handleImgClick}
          src={uploadPng}
          alt=""
        />
      </Styled.Label>
      <Styled.Input
        ref={inputRef}
        placeholder="Enter text"
        required
        type="file"
        id={id}
        value={value}
        onChange={handleFileChange}
      />
    </Styled.Wrapper>
  )
}

export default InputUpload
