import styled from 'styled-components'
import bgTitle from './assets/images/bgTitle.jpg'
import { device } from '../../App.styled'

const Wrapper = styled.div`
  height: 200px;
  width: 100%;

  max-height: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 12px;

  padding-top: 24px;
  padding-bottom: 24px;

  background-image: url(${bgTitle});
  background-size: cover;

  @media ${device.laptopL} {
    max-width: 1024px;
  }
`

const Title = styled.div`
  width: 90%;

  font-weight: bold;
  font-size: 120%;

  @media ${device.desktop} {
    font-size: 370%;
  }
`

const Text = styled.div`
  width: 90%;

  font-size: 70%;

  @media ${device.desktop} {
    font-size: 270%;
  }
`

const styledTitle = {
  Wrapper,
  Text,
  Title,
}

export default styledTitle
