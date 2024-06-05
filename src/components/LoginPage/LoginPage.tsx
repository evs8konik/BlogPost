import { FC } from 'react'
import Styled from './LoginPage.styles'
import Login from '../../containers/Login/Login'

type TProps = {}

const LoginPage: FC<TProps> = ({}) => {
  return (
    <Styled.Wrapper>
      <Login />
    </Styled.Wrapper>
  )
}

export default LoginPage
