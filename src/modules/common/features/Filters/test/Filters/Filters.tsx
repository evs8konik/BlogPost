import React, { ChangeEvent, FC, useState } from 'react'

import useFilters from '../../../../../../hooks/useFilters/useFilters'
import Select, { ISelectOption } from '../../../../components/Select/Select'
import ButtonNormal from '../../../../../../components/buttons/ButtonNormal/ButtonNormal'
import Checkbox from '../../../../../../components/inputs/Checkbox/Checkbox'
import { IFilterDataItem, IFiltersLocalData } from '../../interfaces/FiltersLocalData/FiltersLocalData'

interface IProps {
  filtersConfig: IFiltersLocalData
  filterKey: any
}

const Filters: FC<IProps> = ({ filtersConfig, filterKey }) => {
  const { addFilter, updateFilterState } = useFilters()

  const [selectedOptions, setSelectedOptions] = useState<ISelectOption[]>([])
  const [checkboxStates, setCheckboxStates] = useState<boolean[]>([])

  const handleSelectOption = (index: number, option: ISelectOption) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = [...prevSelectedOptions]
      updatedOptions[index] = option
      return updatedOptions
    })
  }

  const handleChangeIsChecked = (index: number, checked: boolean) => {
    setCheckboxStates((prevCheckboxStates) => {
      const updatedCheckboxStates = [...prevCheckboxStates]
      updatedCheckboxStates[index] = checked
      return updatedCheckboxStates
    })
  }

  const handleAddFilters = (): void => {
    addFilter(filterKey, filtersConfig.posts.filters, filtersConfig.posts.isShow)
    // updateFilter()
  }

  const filterData: IFilterDataItem[] = filtersConfig.posts.filters

  return (
    <>
      {filterData.map((filterItem, index) => (
        <div key={filterItem.id}>
          {filterItem.type === 'select' && filterItem.optionsList && (
            <Select
              optionList={filterItem.optionsList}
              selectedOption={selectedOptions[index] || { label: 'Sort none', value: 'sort none' }}
              onSelect={(option) => {
                handleSelectOption(index, option)
                updateFilterState(filtersConfig, filterKey, index, option.label)
              }}
            />
          )}

          {filterItem.type === 'checkbox' && (
            <Checkbox
              label={filterItem.label}
              checked={checkboxStates[index] || false}
              onChange={(e) => {
                handleChangeIsChecked(index, e.target.checked)
                updateFilterState(filtersConfig, filterKey, index, e.target.checked)
              }}
            />
          )}
        </div>
      ))}
      <ButtonNormal onClick={handleAddFilters}>Filtered</ButtonNormal>
    </>
  )
}

export default Filters
