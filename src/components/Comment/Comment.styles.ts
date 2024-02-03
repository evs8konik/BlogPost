import styled, { css } from 'styled-components'

const wrapperPreset = css`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  gap: 10px;
  background-color: white;
`

const titlePreset = css`
  width: 100%;
  display: flex;
  justify-content: start;
  font-weight: bold;
  text-transform: uppercase;
`

const contentPreset = css`
  width: 100%;
  display: flex;
  justify-content: start;
  text-align: justify;
`

const usernamePreset = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-style: italic;
  text-transform: capitalize;
`

const buttonWrapperPreset = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const getPreset = (preset: string) => {
  switch (preset) {
    case 'wrapper':
      return wrapperPreset
    case 'title':
      return titlePreset
    case 'content':
      return contentPreset
    case 'username':
      return usernamePreset
    case 'buttonWrapper':
      return buttonWrapperPreset

    default:
      return css``
  }
}

const Div = styled.div<{
  $preset: string
  $color?: string
}>`
  ${({ $color }) => css`
    color: red;
  `}
  ${({ $preset }) => getPreset($preset)};
`

const StyledDiv = {
  Div,
}

export default StyledDiv
