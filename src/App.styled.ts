import styled from 'styled-components'

export const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
}

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
}

const GeneralWrapper = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;

  gap: 15px;
`

const Notification = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: start;
  align-items: end;
  flex-direction: column;

  position: fixed;

  z-index: 9997;

  pointer-events: none;

  gap: 5px;
`

const StyledNormalInput = {
  GeneralWrapper,
  Notification,
}

export default StyledNormalInput
