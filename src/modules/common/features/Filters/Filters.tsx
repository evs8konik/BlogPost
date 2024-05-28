import React, { FC, useEffect, useState } from 'react'
import { IFiltersLocalData, IFiltersLocalDataConfig } from './interfaces/FiltersLocalData/FiltersLocalData'
import Checkbox from '../../../../components/inputs/Checkbox/Checkbox'
import Select, { ISelectOption } from '../../components/Select/Select'
import { useDispatch, useSelector } from 'react-redux'

import {
  initialFiltersConfig,
  initialFiltersState,
  selectFiltersConfig,
  selectFiltersState,
} from '../../../store/reducers/FiltersState.slice'
import useFiltersTest from './useFilters/useFilters'

interface IProps {
  filtersLocalDataConfig: IFiltersLocalDataConfig
  filtersId: string
}

const Filters: FC<IProps> = ({ filtersLocalDataConfig, filtersId }) => {
  const dispatch = useDispatch()

  const { updateFilter } = useFiltersTest()

  const filtersConfigData = useSelector(selectFiltersConfig)
  const filtersLocalDataState: IFiltersLocalData = useSelector(selectFiltersState)

  console.log('FILTERS_STATE', filtersLocalDataState)
  console.log('FILTERS_CONFIG', filtersConfigData)

  useEffect(() => {
    dispatch(initialFiltersConfig(filtersLocalDataConfig))
    dispatch(initialFiltersState(filtersLocalDataConfig))
  }, [])

  const filtersData = filtersLocalDataState[filtersId]
  const isShowValue = filtersData ? filtersData.isShow : false

  console.log('filtersData', filtersData)
  console.log('isShowValue', isShowValue)

  const [selectedOptions, setSelectedOptions] = useState<{ [filterId: string]: string }>({})
  const [checkboxStates, setCheckboxStates] = useState<{ [filterId: string]: boolean }>({})

  const handleSelectOption = (filterId: string, option: ISelectOption) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [filterId]: option.value.toString(),
    }))

    updateFilter({ filtersId, filterId, newState: option.label })
  }

  const handleChangeIsChecked = (filterId: string, checked: boolean) => {
    setCheckboxStates((prevCheckboxStates) => ({
      ...prevCheckboxStates,
      [filterId]: checked,
    }))

    updateFilter({ filtersId, filterId, newState: checked })
  }

  const renderFilter = (filterId: string, filterValue: string | boolean) => {
    if (typeof filterValue === 'string') {
      return (
        <Select
          key={filterId}
          optionList={[{ label: 'Sort none', value: 'sort none' }]}
          selectedOption={{
            label: selectedOptions[filterId] || 'Sort none',
            value: selectedOptions[filterId] || 'sort none',
          }}
          onSelect={(option) => {
            handleSelectOption(filterId, option)
          }}
        />
      )
    } else if (typeof filterValue === 'boolean') {
      return (
        <Checkbox
          label={filterId}
          checked={checkboxStates[filterId] || false}
          onChange={(e) => {
            handleChangeIsChecked(filterId, e.target.checked)
          }}
        />
      )
    }
    return null
  }

  return (
    <>
      {filtersData &&
        isShowValue &&
        Object.entries(filtersData.filters).map(([filterId, filterValue]) => (
          <div key={filterId}>{renderFilter(filterId, filterValue)}</div>
        ))}
    </>
  )
}

export default Filters
