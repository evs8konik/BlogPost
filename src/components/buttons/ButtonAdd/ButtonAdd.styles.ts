import styled, { css } from 'styled-components'

const Button = styled.button<{ $color: 'primary' | 'secondary' }>`
  height: 30px;
  width: 200px;

  border-radius: 8px;

  padding: 4px 6px;

  font-weight: bold;

  ${({ $color }) => {
    switch ($color) {
      case 'primary':
        return css`
          background-color: rgb(248, 86, 25);
          color: white;
        `

      case 'secondary':
        return css`
          background-color: rgb(248, 86, 25);
          color: black;
        `

      default:
    }
  }};
`

const StyledButtonAdd = {
  Button,
}

export default StyledButtonAdd
