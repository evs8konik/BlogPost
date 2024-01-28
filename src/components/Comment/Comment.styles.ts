import styled from 'styled-components'

export const Wrapper = styled.div`
  height: auto;
  width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  gap: 10px;
  background-color: white;
`

export const Title = styled.div`
  width: 800px;
  display: flex;
  justify-content: start;
  font-weight: bold;
  text-transform: uppercase;
`

export const Content = styled.div`
  width: 800px;
  display: flex;
  justify-content: start;
  text-align: justify;
`

export const Username = styled.div`
  width: 800px;
  display: flex;
  justify-content: flex-end;
  font-style: italic;
  text-transform: capitalize;
`

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
