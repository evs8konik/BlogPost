import styled, { css } from 'styled-components'

const Wrapper = styled.div`
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

const Title = styled.div`
  width: 100%;

  display: flex;
  justify-content: start;

  font-weight: bold;
  text-transform: uppercase;
`

const Content = styled.div`
  width: 100%;

  display: flex;
  justify-content: start;

  text-align: justify;
`

const Username = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;

  font-style: italic;
  text-transform: capitalize;
`

const ButtonWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
`

const PictureWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`

const Pictures = styled.div``

const Img = styled.img``

const WrapperPicture = styled.div``

const StyledComment = {
  Wrapper,
  ButtonWrapper,
  Username,
  Content,
  Title,
  PictureWrapper,
  Pictures,
  WrapperPicture,
  Img,
}

export default StyledComment
