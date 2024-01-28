import { FC, PropsWithChildren } from 'react'
import Styled from './ButtonNormal.styles'

interface IProps {
  preset?: 'edit' | 'delete' | 'add' | 'reply' | 'save' | 'close' | 'login' | 'logout' | 'singIn' | 'singUp'
  color?: 'orange' | 'blue' | 'red' | 'purple'
  size?: 'big' | 'average' | 'small'
  onClick?: () => void
}

const ButtonNormal: FC<PropsWithChildren<IProps>> = ({ color, size, children, preset, onClick }) => {
  return (
    <Styled.Button
      type={'submit'}
      onClick={onClick}
      $color={color ?? 'orange'}
      $size={size ?? 'big'}
      $preset={preset ?? ''}
    >
      {children}
    </Styled.Button>
  )
}

export default ButtonNormal
