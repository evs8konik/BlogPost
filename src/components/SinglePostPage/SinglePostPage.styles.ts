import styled from 'styled-components'
import { device } from '../../App.styled'

const Wrapper = styled.div`
  height: auto;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 24px;
  padding-bottom: 24px;

  background-color: white;
`

const PostWrapper = styled.div`
  height: auto;
  width: 90%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;

  @media ${device.desktop} {
    width: 70%;
  }
`

const StyledSinglePostPage = {
  Wrapper,
  PostWrapper,
}

export default StyledSinglePostPage
