import styled from 'styled-components'
import { device } from '../../App.styled'

const PostBlockWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 30px;

  @media ${device.laptopL} {
    max-width: 1024px;
  }
`

const Wrapper = styled.div`
  width: 90%;

  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 30px;
`

const Title = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  font-size: 100%;
  font-weight: bold;

  @media ${device.mobileL} {
    justify-content: start;
  }
`

const PostWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 10px;

  font-size: 100%;

  @media ${device.tablet} {
    display: grid;
    grid-template-rows: auto auto repeat(3, 1fr);

    grid-template-columns: auto auto;

    :nth-child(-n + 2) {
      grid-column: span 2;
    }
  }
`

const WrapperTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 24px;
  padding-left: 24px;
  padding-right: 24px;

  gap: 15px;

  @media ${device.mobileL} {
    justify-content: space-between;
    flex-direction: row;
  }
`

const WrapperPageButtons = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
`

const WrapperButtons = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  gap: 5px;
`

const StyledContentBlock = {
  Wrapper,
  Title,
  PostWrapper,
  WrapperTitle,
  WrapperPageButtons,
  WrapperButtons,
  PostBlockWrapper,
}

export default StyledContentBlock
