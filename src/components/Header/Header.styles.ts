import styled from 'styled-components'
import { device } from '../../App.styled'

const ShadowBackground = styled.div`
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.3);

  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: end;
`

const LoginForm = styled.div`
  width: 100%;

  border-radius: 100px;

  z-index: 2;
`

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  background-image: linear-gradient(to right, rgb(21, 111, 233), rgb(12, 90, 220));

  @media ${device.desktop} {
    width: 70%;
  }
`

const ButtonCloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

// const LoginHeader = styled.div`
//   height: 50px;
//   width: 70%;

//   background-color: #fff;

//   border-radius: 15px;
//   padding: 10px;

//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
// `

const LogoutHeader = styled.div`
  height: auto;
  width: 90%;

  flex-direction: column;

  /* background-color: white; */

  /* border-radius: 15px; */
  gap: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  font-size: 80%;

  @media ${device.mobileS} {
    gap: 15px;
  }

  @media ${device.mobileL} {
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    gap: 10px;
  }

  @media ${device.tablet} {
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    gap: 10px;
  }
`

const CurrentUserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`

const UserName = styled.div`
  color: white;
`
const Img = styled.img`
  height: 60px;
  width: auto;

  border-radius: 15px;

  cursor: pointer;
`

const StyledHeader = {
  Wrapper,
  device,
  ShadowBackground,
  LoginForm,
  ButtonCloseWrapper,
  // LoginHeader,
  LogoutHeader,
  UserName,
  Img,
  CurrentUserWrapper,
}

export default StyledHeader
