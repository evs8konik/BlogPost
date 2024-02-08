import styled, { css } from 'styled-components'

// Пресет для кнопки "Add"
const addPreset = css`
  height: 30px;
  width: 200px;

  border-radius: 8px;

  padding: 4px 6px;

  font-weight: bold;

  background-color: rgb(248, 86, 25);
  color: white;
`

// Пресет для кнопки "Delete"
const deletePreset = css`
  height: 20px;
  width: 50px;

  border-radius: 8px;

  padding: 4px 6px;
  margin: 3px;

  background-color: rgb(164, 46, 22);
  color: white;

  font-weight: bold;

  font-size: 10px;
`

// Пресет для кнопки "Edit"
const editPreset = css`
  height: 20px;
  width: 50px;

  border-radius: 8px;

  padding: 4px 6px;
  margin: 3px;

  background-color: rgb(69, 137, 199);
  color: white;

  font-weight: bold;

  font-size: 10px;
`

// Пресет для кнопки "Close"
const closePreset = css`
  height: 20px;
  width: 50px;

  border-radius: 8px;

  padding: 4px 6px;
  margin: 3px;

  background-color: rgb(200, 27, 27);
  color: white;

  font-weight: bold;

  font-size: 10px;
`

// Пресет для кнопки "Reply"
const replyPreset = css`
  height: 20px;
  width: 50px;

  border-radius: 8px;

  padding: 4px 6px;
  margin: 3px;

  background-color: rgb(156, 101, 190);
  color: white;

  font-weight: bold;

  font-size: 10px;
`

// Пресет для кнопки "Save"
const savePreset = css`
  height: 20px;
  width: 50px;

  border-radius: 8px;

  padding: 4px 6px;
  margin: 3px;

  background-color: rgb(16, 114, 24);
  color: white;

  font-weight: bold;

  font-size: 10px;
`

// Пресет для кнопки "Login"
const loginPreset = css`
  height: 30px;
  width: 150px;

  border-radius: 8px;

  padding: 4px 6px;

  background-color: #314f8a;
  color: white;

  font-weight: bold;
`

// Пресет для кнопки "Login"
const logoutPreset = css`
  height: 30px;
  width: 150px;

  border-radius: 8px;

  padding: 4px 6px;

  background-color: #696969;
  color: white;

  font-weight: bold;
`

// Пресет для кнопки "Sing In"
const singInPreset = css`
  height: 30px;
  width: 100%;

  border-radius: 8px;

  padding: 4px 6px;

  background-color: #34495e;
  color: white;

  font-weight: bold;
`

// Пресет для кнопки "SingUp"
const singUpPreset = css`
  height: 30px;
  width: 100%;

  border-radius: 8px;

  padding: 4px 6px;

  background-color: #e74c3c;
  color: white;

  font-weight: bold;
`

const getPreset = (preset: string) => {
  switch (preset) {
    case 'edit':
      return editPreset

    case 'delete':
      return deletePreset

    case 'add':
      return addPreset
    case 'close':
      return closePreset
    case 'reply':
      return replyPreset
    case 'save':
      return savePreset
    case 'login':
      return loginPreset
    case 'logout':
      return logoutPreset
    case 'singIn':
      return singInPreset
    case 'singUp':
      return singUpPreset

    default:
      return css``
  }
}

const Button = styled.button<{
  $color: 'orange' | 'blue' | 'red' | 'purple'
  $size: 'big' | 'average' | 'small'
  $preset: string
}>`
  ${({ $color }) => {
    switch ($color) {
      case 'orange':
        return css`
          background-color: rgb(248, 86, 25);
          color: white;
        `

      case 'red':
        return css`
          background-color: rgb(164, 46, 22);
          color: white;
        `

      case 'purple':
        return css`
          background-color: rgb(248, 86, 25);
          color: black;
        `

      case 'blue':
        return css`
          background-color: rgb(69, 137, 199);
          color: white;
        `

      default:
    }
  }};

  ${({ $size }) => {
    switch ($size) {
      case 'big':
        return css`
          height: 30px;
          width: 200px;

          border-radius: 8px;

          padding: 4px 6px;

          font-weight: bold;
        `

      case 'small':
        return css`
          height: 20px;
          width: 50px;

          border-radius: 8px;

          padding: 4px 6px;
          margin: 3px;

          font-weight: bold;

          font-size: 10px;
        `

      case 'average':
        return css`
          background-color: rgb(248, 86, 25);
          color: black;
        `

      default:
    }
  }};
  ${({ $preset }) => getPreset($preset)};
`

const StyledButton = {
  Button,
}

export default StyledButton
