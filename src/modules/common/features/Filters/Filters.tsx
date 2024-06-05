import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialFilters, selectFilters } from '../../../store/reducers/FiltersState.slice'
import useFiltersTest from './useFilters/useFilters'
import { IFiltersConfig, IFilter } from './interfaces/FiltersLocalData/FiltersLocalData'
import FilterBuilder from './FilterBuilder'

interface IProps {
  filtersLocalDataConfig: IFiltersConfig
  filtersId: string
}

const Filters: FC<IProps> = ({ filtersLocalDataConfig, filtersId }) => {
  const dispatch = useDispatch()
  const { updateFilter } = useFiltersTest()
  const filters = useSelector(selectFilters)

  const [selectedOptions, setSelectedOptions] = useState<{ [filterId: string]: string }>({})

  useEffect(() => {
    dispatch(initialFilters(filtersLocalDataConfig))
  }, [dispatch, filtersLocalDataConfig])

  const filtersData = filters[filtersId]

  const handleChange = (filterId: string, value: string | boolean) => {
    updateFilter({ filtersId, filterId, newState: value })
  }

  if (!filtersData) {
    return <></>
  }

  return (
    <>
      {filtersData.filters &&
        Object.keys(filtersData.filters).map((filterId) => {
          const filter = filtersData.filters[filterId]
          const filterValue = filtersData.applyValues[filterId]

          return (
            <FilterBuilder
              key={filterId}
              filter={filter}
              filterValue={filterValue}
              handleChange={handleChange}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          )
        })}
    </>
  )
}

export default Filters
