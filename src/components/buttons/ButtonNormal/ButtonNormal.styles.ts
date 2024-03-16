import styled, { css } from 'styled-components'

// Пресет для кнопки "Add"
const addPreset = css`
  height: 30px;
  width: 200px;

  border-radius: 8px;

  padding: 4px 6px;

  font-weight: bold;

  background-color: rgb(27, 206, 80);
  color: white;

  cursor: pointer;
`

// Пресет для кнопки "Delete"
const deletePreset = css`
  height: 20px;
  width: 50px;

  border-radius: 8px;

  padding: 4px 6px;
  margin: 3px;

  border: 1px solid rgb(164, 46, 22);

  background-color: white;
  color: rgb(164, 46, 22);

  font-weight: bold;

  font-size: 10px;

  cursor: pointer;
`

// Пресет для кнопки "Edit"
const editPreset = css`
  height: 20px;
  width: 50px;

  border-radius: 8px;

  padding: 4px 6px;
  margin: 3px;

  border: 1px solid rgb(14, 103, 230);

  background-color: white;
  color: rgb(14, 103, 230);

  font-weight: bold;

  font-size: 10px;

  cursor: pointer;
`

// Пресет для кнопки "Close"
const closePreset = css`
  height: 20px;
  width: 50px;

  border-radius: 8px;

  padding: 4px 6px;
  margin: 3px;

  border: 1px solid rgb(200, 27, 27);

  background-color: white;
  color: rgb(200, 27, 27);

  font-weight: bold;

  font-size: 10px;

  cursor: pointer;
`

// Пресет для кнопки "Reply"
const replyPreset = css`
  height: 20px;
  width: 50px;

  border-radius: 8px;

  padding: 4px 6px;
  margin: 3px;

  background-color: rgb(27, 206, 80);
  color: white;

  font-weight: bold;

  font-size: 10px;

  cursor: pointer;
`

// Пресет для кнопки "Save"
const savePreset = css`
  height: 20px;
  width: 50px;

  border-radius: 8px;

  padding: 4px 6px;
  margin: 3px;

  border: 1px solid rgb(27, 206, 80);

  background-color: white;
  color: rgb(27, 206, 80);

  font-weight: bold;

  font-size: 10px;

  cursor: pointer;
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

  cursor: pointer;
`

// Пресет для кнопки "Login"
const logoutPreset = css`
  height: 30px;
  width: 150px;

  border-radius: 8px;

  padding: 4px 6px;

  border: 2px solid white;

  background-color: rgba(0, 0, 0, 0);
  color: white;

  font-weight: bold;

  cursor: pointer;
`

// Пресет для кнопки "Sing In"
const singInPreset = css`
  height: 30px;
  width: 100%;

  border-radius: 8px;

  padding: 4px 6px;

  background-color: rgb(27, 206, 80);
  color: white;

  font-weight: bold;

  cursor: pointer;
`

// Пресет для кнопки "SingUp"
const singUpPreset = css`
  height: 30px;
  width: 100%;

  border-radius: 8px;

  padding: 4px 6px;

  background-color: rgb(50, 66, 84);
  color: white;

  font-weight: bold;

  cursor: pointer;
`

const numberPage = css`
  height: 25px;
  width: 25px;

  border-radius: 8px;

  padding: 4px 4px;

  background-color: rgb(21, 111, 230);
  color: white;

  font-weight: bold;
  font-size: 12px;

  cursor: pointer;
`

const nextPrevPage = css`
  height: 25px;
  width: 95px;

  border-radius: 8px;

  padding: 4px 6px;

  background-color: rgb(21, 111, 230);
  color: white;

  font-weight: bold;
  font-size: 12px;

  cursor: pointer;
`

const select = css`
  width: 100%;
  min-width: 120px;

  border: 1px solid rgb(27, 206, 80);

  background-color: white;
  color: rgb(27, 206, 80);

  border-radius: 8px;

  font-size: 16px;

  cursor: pointer;

  padding: 4px 6px;

  font-weight: bold;

  font-size: 15px;
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

    case 'numberPage':
      return numberPage

    case 'nextPrevPage':
      return nextPrevPage

    case 'select':
      return select

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
