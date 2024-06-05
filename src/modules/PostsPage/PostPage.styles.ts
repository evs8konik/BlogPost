import styled from 'styled-components'
import { device } from '../../App.styled'

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  gap: 10px;

  @media ${device.laptopL} {
    max-width: 1024px;
  }
`

const StyledPostPage = {
  Wrapper,
}

export default StyledPostPage
