import React from 'react'
import Checkbox from '../../../../components/inputs/Checkbox/Checkbox'
import Select from '../../components/Select/Select'
import { IFilter } from './interfaces/FiltersLocalData/FiltersLocalData'

interface IFilterProps {
  filter: IFilter
  filterValue: string | boolean
  handleChange: (filterId: string, value: string | boolean) => void
  selectedOptions: { [key: string]: string }
  setSelectedOptions: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
}

const FilterBuilder: React.FC<IFilterProps> = ({
  filter,
  filterValue,
  handleChange,
  selectedOptions,
  setSelectedOptions,
}) => {
  switch (filter.type) {
    case 'select':
      return (
        <Select
          key={filter.id}
          optionList={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
          ]}
          selectedOption={{
            label: selectedOptions[filter.id] || 'Select an option',
            value: selectedOptions[filter.id] || '',
          }}
          onSelect={(option) => {
            setSelectedOptions((prevSelectedOptions) => ({
              ...prevSelectedOptions,
              [filter.id]: option.value.toString(),
            }))
            handleChange(filter.id, option.value.toString())
          }}
        />
      )
    case 'checkbox':
      return (
        <Checkbox
          key={filter.id}
          label={filter.name}
          checked={filterValue as boolean}
          onChange={(e) => handleChange(filter.id, e.target.checked)}
        />
      )
    default:
      return null
  }
}

export default FilterBuilder
