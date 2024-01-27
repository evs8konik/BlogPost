import styled from 'styled-components'

export const ShadowBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoginForm = styled.div`
  z-index: 2;
`

export const ButtonCloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const LoginHeader = styled.div`
  height: 50px;
  width: 900px;
  background-color: #fff;
  border-radius: 15px;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const LogoutHeader = styled.div`
  height: 50px;
  width: 900px;
  background-color: #fff;
  border-radius: 15px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
