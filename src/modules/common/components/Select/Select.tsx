import React, { FC, useState, useRef, useEffect } from 'react'
import Styled from './Select.styles'
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside/useOnClickOutside'
import ButtonNormal from '../../../../components/buttons/ButtonNormal/ButtonNormal'

const filterByValue = (value: ISelectOption['value'], optionList: ISelectOption[]): ISelectOption[] => {
  if (value || value === '0' || value === 0) {
    return optionList.filter((option) => option.value !== value)
  }

  return optionList
}
export interface ISelectOption {
  label: string
  value: string | number
}

interface IProps {
  optionList: ISelectOption[]
  selectedOption: ISelectOption
  onSelect: (value: ISelectOption['value'], option: ISelectOption) => void
}

const Select: FC<IProps> = ({ optionList, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [_selectedOption, _setSelectedOption] = useState<ISelectOption | null>(null)
  const [_optionList, _setOptionList] = useState<ISelectOption[]>([])

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    _setSelectedOption(selectedOption)
    _setOptionList(filterByValue(selectedOption?.value, optionList))
  }, [selectedOption])

  useEffect(() => {
    if (_selectedOption) {
      _setOptionList(filterByValue(_selectedOption?.value, optionList))
    } else {
      _setOptionList(optionList)
    }
  }, [optionList])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (option: ISelectOption) => {
    onSelect(option.value, option)
    _setSelectedOption(option)
    setIsOpen(false)
  }

  useOnClickOutside(dropdownRef as React.MutableRefObject<HTMLDivElement>, () => {
    setIsOpen(false)
  })

  // const filteredOptions = optionList.filter((option) => option.label !== selectedOption)

  return (
    <Styled.Dropdown ref={dropdownRef}>
      <ButtonNormal
        preset="select"
        onClick={toggleDropdown}
      >
        {_selectedOption ? _selectedOption.label : ''}
      </ButtonNormal>

      {isOpen && (
        <Styled.DropdownContent>
          {_optionList.map((option) => (
            <Styled.Option
              key={option.value}
              href="#"
              onClick={() => handleSelect(option)}
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
