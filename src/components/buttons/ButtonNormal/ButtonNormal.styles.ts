import styled, { css } from 'styled-components'

// Пресет для кнопки "Add"
const addPreset = css`
  height: 30%;
  width: 100px;

  border-radius: 8px;

  padding: 4px 6px;

  font-weight: bold;
  font-size: 80%;

  background-color: #1fa8ad;
  color: white;

  box-shadow:
    0 8px 16px 0 rgba(0, 0, 0, 0),
    0 6px 20px 0 rgba(0, 0, 0, 0);

  cursor: pointer;

  &:hover {
    box-shadow:
      0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
`

const addHeaderPreset = css`
  height: 30%;
  width: 100px;

  border-radius: 2px;

  /* padding: 6px; */

  font-weight: bold;
  font-size: 100%;

  background-color: white;
  color: #1fa8ad;

  cursor: pointer;
`

// Пресет для кнопок "Header"
const headerPreset = css`
  height: 30%;
  width: auto;

  border-radius: 8px;

  font-weight: bold;
  font-size: 100%;

  background-color: rgba(0, 0, 0, 0);
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

  background-color: #1fa8ad;
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

  border: 1px solid #1fa8ad;

  background-color: white;
  color: #1fa8ad;

  font-weight: bold;

  font-size: 10px;

  cursor: pointer;
`

// Пресет для кнопки "Login"
const loginPreset = css`
  height: 20px;
  width: 100px;

  border-radius: 8px;

  padding: 4px 6px;

  background-color: white;
  color: #1fa8ad;

  font-weight: bold;
  font-size: 80%;

  cursor: pointer;
`

// Пресет для кнопки "Logout"
const logoutPreset = css`
  height: 20px;
  width: 100px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;

  padding: 4px 6px;

  border: 2px solid white;

  background-color: rgba(0, 0, 0, 0);
  color: white;

  font-weight: bold;
  font-size: 80%;

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
  height: 50%;
  width: 25px;

  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;

  background-color: #1fa8ad;
  color: white;

  font-weight: bold;
  font-size: 70%;

  cursor: pointer;
`

const nextPrevPage = css`
  height: 50%;
  width: 100px;

  border-radius: 8px;

  padding: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #1fa8ad;
  color: white;

  font-weight: bold;
  font-size: 70%;

  cursor: pointer;
`

const select = css`
  width: 100%;
  min-width: 120px;

  border: 1px solid #1fa8ad;

  background-color: white;
  color: #1fa8ad;

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

    case 'addHeader':
      return addHeaderPreset

    case 'header':
      return headerPreset

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
  // $color: 'orange' | 'blue' | 'red' | 'purple'
  // $size: 'big' | 'average' | 'small'
  $preset: string
}>`
  ${({ $preset }) => getPreset($preset)};
`

const StyledButton = {
  Button,
}

export default StyledButton
