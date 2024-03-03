import styled from 'styled-components'

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
