import React, { FC } from 'react'

export interface ISelectOption {
  label: string
  value: string
}

interface IProps {
  optionList: ISelectOption[]
  selectedOption: string
  onSelect: () => void
}

const Select: FC<IProps> = ({ optionList }) => {
  return <div></div>
}

export default Select
