import styled from 'styled-components'
import { device } from '../../App.styled'

const Wrapper = styled.div`
  height: 20px;
  width: 100%;

  display: flex;
  justify-content: center;

  background-color: rgb(3, 21, 42);
  color: white;

  @media ${device.mobileS} {
    font-size: 14px;
  }

  @media ${device.desktop} {
    width: 70%;
  }
`

const StyledHeader = {
  Wrapper,
}

export default StyledHeader
