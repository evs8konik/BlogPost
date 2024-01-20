import { FC, PropsWithChildren } from 'react'
import Styled from './ButtonAdd.styles'

interface IProps {
  color?: 'primary' | 'secondary'
}

const ButtonAdd: FC<PropsWithChildren<IProps>> = ({ color, children }) => {
  return (
    <Styled.Button
      type={'submit'}
      $color={color ?? 'primary'}
    >
      {children}
    </Styled.Button>
  )
}

export default ButtonAdd
