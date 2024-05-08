import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  IFiltersLocalData,
  IFilterDataItem,
} from '../../modules/common/features/Filters/interfaces/FiltersLocalData/FiltersLocalData'
import { FiltersActions, selectFilters } from '../../modules/common/features/Filters/store/reducers/Filters.slice'
import { useAppSelector } from '../../app/hooks'
import { ISelectOption } from '../../modules/common/components/Select/Select'

const STORAGE_KEY = 'filters'

interface IStoredFilters {
  filters: IFiltersLocalData
}

const getStoredFilters = (): IFiltersLocalData => {
  const storedData = localStorage.getItem(STORAGE_KEY)

  if (!storedData) return {}

  const { filters: storedFilters } = JSON.parse(storedData) as IStoredFilters

  return storedFilters
}

const saveFilters = (newFilters: IFiltersLocalData): void => {
  const storedData: IStoredFilters = { filters: { ...newFilters } }

  const formattedStoreData = JSON.stringify(storedData)

  localStorage.setItem(STORAGE_KEY, formattedStoreData)
}

const useFilters = () => {
  const dispatch = useDispatch()
  const filters = useAppSelector(selectFilters)

  useEffect(() => {
    const storedFilters = getStoredFilters()
    if (Object.keys(storedFilters).length > 0) {
      dispatch(FiltersActions.addFilters(storedFilters))
    }
  }, [])

  const addFilter = (filtersId: string, newFilters: IFilterDataItem[], isShow: boolean) => {
    dispatch(FiltersActions.addFilter({ filtersId, newFilters, isShow }))

    saveFilters(filters)
  }

  function updateFilterState(
    filtersData: IFiltersLocalData,
    filtersId: string,
    index: number,
    newState: boolean | string,
  ): void {
    if (filtersData[filtersId] && filtersData[filtersId].filters[index]) {
      filtersData[filtersId].filters[index].filterState = newState
    }
  }

  return {
    addFilter,
    updateFilterState,
  }
}

export default useFilters
