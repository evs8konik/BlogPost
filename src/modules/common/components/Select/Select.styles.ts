import styled from 'styled-components'

const Dropdown = styled.div`
  position: relative;

  display: inline-block;
`

const DropdownContent = styled.div`
  position: absolute;

  background-color: #f9f9f9;

  min-width: 130px;
  max-height: 700px;

  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

  z-index: 1;
`

const Option = styled.a`
  color: black;

  padding: 12px 16px;

  text-decoration: none;

  display: block;
`

const StyledSelect = {
  Dropdown,
  DropdownContent,
  Option,
}

export default StyledSelect
