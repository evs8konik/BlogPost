import React, { FC, useState } from 'react'
import Styled from './Select.styles'

export interface ISelectOption {
  label: string
  value: string
}

interface IProps {
  optionList: ISelectOption[]
  selectedOption: string
  onSelect: (value: string) => void
}

const Select: FC<IProps> = ({ optionList, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (value: string) => {
    onSelect(value)
    setIsOpen(false)
  }

  return (
    <Styled.Dropdown>
      <Styled.Button onClick={toggleDropdown}>{selectedOption}</Styled.Button>
      {isOpen && (
        <Styled.DropdownContent>
          {optionList.map((option) => (
            <Styled.Option
              href="#"
              onClick={() => handleSelect(option.label)}
            >
              {option.label}
            </Styled.Option>
          ))}
        </Styled.DropdownContent>
      )}
    </Styled.Dropdown>
  )
}

export default Select
